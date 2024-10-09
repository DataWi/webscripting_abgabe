import { Layout } from "@/components/ui/layout";

import { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps & { pageProps: { session: any } }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
