import { useEffect, useState } from "react";
import Lectures from "../../assets/lectures.json";
import {
  Accordion,
  Container,
  Form,
  ProgressBar,
  Stack,
} from "react-bootstrap";

type Section = {
  sectionName: string;
  index: number;
  lectures: Lecture[];
};

type LectureList = {
  courseId: number;
  lastOpened: number;
  progress: number;
  sections: Section[];
};

type Lecture = {
  lectureName: string;
  lectureUrl: string;
  index: number;
  completed: boolean;
};

export default function LectureList({ courseId }: { courseId: number }) {
  const [sections, setSections] = useState([] as Section[]);
  const [lastOpened, setLastOpened] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleChange = (sectionIndex: number, lectureIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].lectures[lectureIndex].completed =
      !newSections[sectionIndex].lectures[lectureIndex].completed;
    setSections(newSections);
  };

  useEffect(() => {
    const sectionList = (Lectures as LectureList[]).find(
      (course) => course.courseId === courseId
    );
    if (!sectionList) return;
    setLastOpened(sectionList.lastOpened);
    setSections(sectionList.sections);
    setProgress(sectionList.progress * 100);
  }, [courseId, progress]);

  return (
    <Container>
      <h3>Course Content</h3>
      <ProgressBar
        now={progress}
        variant='info'
        label={`${progress === 100 ? progress : ""}`}
      />
      <hr />
      <Accordion defaultActiveKey={lastOpened.toString()}>
        <Form>
          {sections.map((section, sectionIndex) => (
            <Accordion.Item
              eventKey={sectionIndex.toString()}
              key={section.sectionName}>
              <Accordion.Header>{section.sectionName}</Accordion.Header>
              <Accordion.Body>
                <Stack>
                  {section.lectures.map((lecture, lectureIndex) => (
                    <Lectureitem
                      lecture={lecture}
                      key={lectureIndex}
                      handleChange={() =>
                        handleChange(sectionIndex, lectureIndex)
                      }
                    />
                  ))}
                </Stack>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Form>
      </Accordion>
    </Container>
  );
}

type LectureitemProps = {
  lecture: Lecture;
  handleChange: () => void;
};

const Lectureitem = ({ lecture, handleChange }: LectureitemProps) => (
  <Form.Check
    type='checkbox'
    id={lecture.lectureName + lecture.index}
    label={lecture.lectureName}
    checked={lecture.completed}
    onChange={() => handleChange()}
  />
);
