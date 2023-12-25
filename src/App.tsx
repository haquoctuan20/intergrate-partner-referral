/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Button } from "react-bootstrap";
import queryString from "query-string";
import { useEffect, useState } from "react";

function App() {
  const [parsed, setParsed] = useState<any>(null);

  const handleConnectWithPaypal = async () => {
    await axios
      .get(import.meta.env.VITE_URL_PARTNER_URL)
      .then((res) => {
        console.log("🚀 -> rs -> res:", res);

        const { data } = res;
        const actionURL = data.links.find((i: any) => i?.rel === "action_url");
        console.log("🚀 -> .then -> actionURL:", actionURL);

        window.open(
          `${actionURL?.href}&displayMode=minibrowser`,
          "PPFrame",
          "popup"
        );
      })
      .catch((err) => {
        console.log("🚀 -> rs -> err:", err);
      });
  };

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    const newValue = JSON.stringify(parsed);
    setParsed(newValue);
    console.log(parsed);
  }, [location.search]);

  return (
    <>
      <Button onClick={handleConnectWithPaypal}>Connect with paypal</Button>

      <div>Thông tin nhận được</div>
      {parsed && <>{parsed}</>}
    </>
  );
}

export default App;
