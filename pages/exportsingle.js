import Head from "next/head";
import Menu from "../components/mainMenu";
import Bar from "../components/bar";
import { useState } from "react";
import Result from "../components/result";

export default function Exportsingle() {
   const [record, setRecord] = useState()
  const [details, setDetails] = useState()

  

  
  return (
    <> 
      <Head>
        <title>Export Single result</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="sm:block lg:grid grid-cols-6 h-full fixed w-full">
        <Menu />
        <div className="sm:h-full sm:absolute sm:top-0 sm:left-0 sm:w-full lg:static lg:col-span-5  bg-gray-200 ">
            <Bar setRecord={setRecord} setDetails={setDetails} />

            <Result isExport record={record} details={details} className="m-auto" />
        </div>

        

      </main>
    </>
  );
}

