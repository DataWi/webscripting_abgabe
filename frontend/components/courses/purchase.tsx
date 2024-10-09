import Purchases from "../../assets/purchases.json";
import Courses from "../../assets/course.json";
import { Course } from "@/pages/courses";
import { Accordion, Button, Container, Stack } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

type Purchase = {
  userId: number;
  purchaseId: number;
  purchaseDate: string;
  courseIds: number[];
  totalPrice: number;
};

type PurchaseListPros = {
  purchaseIds: number[];
};

export default function PurchaseList({ purchaseIds }: PurchaseListPros) {
  const [purchaseList, setPurchaseList] = useState<Purchase[]>([]);

  useEffect(() => {
    if (!purchaseIds) return;
    const purchases = Purchases.filter((purchase) =>
      purchaseIds.includes(purchase.purchaseId)
    );
    setPurchaseList(purchases);
  }, [purchaseIds]);

  if (purchaseList.length === 0) return <p>No purchases</p>;

  return (
    <Accordion>
      {purchaseList.map((purchase) => (
        <Accordion.Item
          eventKey={purchase.purchaseId.toString()}
          key={purchase.purchaseId.toString()}>
          <Accordion.Header>
            <Stack direction='horizontal'>
              <div>
                <p>
                  <strong>{purchase.purchaseDate}: </strong>
                </p>{" "}
              </div>
              <div className='ms-auto'>
                <p>{purchase.totalPrice}€</p>
              </div>
            </Stack>
          </Accordion.Header>
          <ReceitBody purchase={purchase} />
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

type PurchaseItemProps = {
  courseId: number;
};

const PurchaseItem = ({ courseId }: PurchaseItemProps) => {
  const [course, setCourse] = useState<Course | undefined>(undefined);

  useEffect(() => {
    const foundCourse = Courses.find((course) => course.id === courseId);
    setCourse(foundCourse);
  }, [courseId]);

  return (
    <Container>
      <Stack direction='horizontal'>
        <p>
          <strong>{course?.title}:</strong>{" "}
        </p>
        <p>{course?.price}€</p>
      </Stack>
      <hr />
    </Container>
  );
};

const ReceitBody = ({ purchase }: { purchase: Purchase }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const removeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    contentRef.current?.children[1].lastChild?.removeChild(e.target as Node);
    reactToPrintFn();
  };

  return (
    <Accordion.Body ref={contentRef}>
      <Stack direction='horizontal'>
        <div>
          <p>
            <strong>{purchase.purchaseDate}: </strong>
          </p>{" "}
        </div>
        <div className='ms-auto'>
          <p>{purchase.totalPrice}€</p>
        </div>
      </Stack>
      <Stack gap={1}>
        {purchase.courseIds.map((id) => (
          <PurchaseItem courseId={id} key={id} />
        ))}
        <Stack direction='horizontal'>
          <p>
            <strong>Total:</strong>
          </p>
          <p>{purchase.totalPrice}€</p>
          <Button
            variant='outline-primary'
            className='ms-auto'
            onClick={(e) => removeButton(e)}>
            Print
          </Button>
        </Stack>
      </Stack>
    </Accordion.Body>
  );
};
