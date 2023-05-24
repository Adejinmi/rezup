import Menu from "../components/mainMenu"
import Head from "next/head"


export default function Department(){
      

    return(
        <>
        <Head>
            <title>Correct Student Details</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <main className="sm:block lg:grid grid-cols-6 h-full fixed w-full">
        <Menu />
        <div className="sm:h-full sm:absolute sm:top-0 sm:left-0 sm:w-full lg:static lg:col-span-5  bg-gray-200  ">
                <h1 className="text-center text-gray-700 text-4xl mt-52">Feature coming soon...</h1>
        </div>

      </main>
        </>
    )
}
