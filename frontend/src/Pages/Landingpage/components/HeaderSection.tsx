import { Carousel } from "flowbite-react";
import { RiCloseLargeFill, RiMenu3Fill } from "react-icons/ri";
import { CustomDrawer } from "../../../templates/CustomDrawer";
import noImage from '../../../assets/No Image.jpg';
import { useState } from "react";
export const HeaderSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <CustomDrawer
        isOpen={isOpen}
        DrawerStyle="w-[12rem]"
        titleIcon={<span className="hidden"></span>}
      />

      <main className="w-full h-full">
        <nav className="bg-black flex justify-between px-48 py-6 w-full mobile:py-2 mobile:px-2 desktop:px-48 desktop:py-6 ">
          <h1 className="text-white px-8 py-2 font-extrabold text-xl mobile:text-base mobile:px-4">{`Event Bliss`}</h1>
          <div className="flex space-x-12 mobile:hidden desktop:flex laptop:flex ">
            <div className="text-white flex space-x-10 px-8 py-2  ">
              <span>{`Schedule`}</span>
              <span>{`Speakers`}</span>
              <span>{`Ticket`}</span>
              <span>{`Contact`}</span>
            </div>
            <button className="text-white border-[0.5px] border-white rounded-3xl px-8 py-2">{`Log in`}</button>
          </div>
          {isOpen ? (
            <RiCloseLargeFill
              className="text-white mx-4 mt-3 desktop:hidden laptop:hidden"
              onClick={() => {
                setIsOpen(true);
              }}
            />
          ) : (
            <RiMenu3Fill
              className="text-white mx-4 mt-3 desktop:hidden laptop:hidden"
              onClick={() => {
                setIsOpen(true);
              }}
            />
          )}
        </nav>
        <section className="h-full w-full">
          <Carousel className="mobile:h-64 desktop:h-[720px] tablet:h-[720px] laptop:h-[720px]">
            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white space-x-8">
              <img src={noImage} alt="" className="h-[20rem] w-[20rem] rounded-lg"/>
              <div className="w-[30rem] ">
                <h3 className="text-2xl font-bold mb-6">{`SBS MTV The Kpop Show Ticket  Package`}</h3>
                <p className="mb-8">{`Look no further! Our SBS The Show tickets are the simplest way for you to experience a live Kpop recording.`}</p>
                <div className="flex space-x-2">
                  <button className="py-4 px-10  bg-black text-white rounded-xl">{`Get Ticket`}</button>
                  <button className="py-4 px-10  border border-white rounded-xl">{`Learn More`}</button>
                </div>
              </div>
            </div>
            {/* <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
              Slide 2
            </div>
            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
              Slide 3
            </div> */}
          </Carousel>
        </section>
      </main>
    </>
  );
};
