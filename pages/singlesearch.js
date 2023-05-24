import Head from "next/head";
import Link from "next/link";
import Menu from "../components/mainMenu";
import Bar from "../components/bar";
import { useEffect, useState } from "react";
import Result from "../components/result";

export default function Singlesearch() {
   const [record, setRecord] = useState()
  const [details, setDetails] = useState()
 
  return (
    <> 
      <Head>
        <title>Search for result</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="sm:block lg:grid grid-cols-6 h-full fixed w-full">
        <Menu />
        <div className="sm:h-full sm:absolute sm:top-0 sm:left-0 sm:w-full lg:static lg:col-span-5  bg-gray-200 ">
            <Bar setRecord={setRecord} setDetails={setDetails} />

            <Result record={record} details={details} className="m-auto" />
        </div>

        

      </main>
    </>
  );
}

