import logo from "../../../assets/Event_Bliss-removebg-preview.png";
import cheer from "../../../assets/cheering.jpg";

export const HeaderSection = () => {
  return (
    <main className="w-full ">
      <img src={cheer} alt="logo" className="w-screen h-screen" />
      <header className="absolute z-50 inset-0 top-0 bg-black opacity-80">
        <nav className="flex justify-between w-full px-48 py-6">
          <img src={logo} alt="logo" className="w-[10%] -mt-4 " />
          <div className="flex space-x-12 mt-10">
            <ul className="text-white flex space-x-10">
              <li>{`Schedule`}</li>
              <li>{`Speakers`}</li>
              <li>{`Ticket`}</li>
              <li>{`Contact`}</li>
            </ul>
            <button className=" w-[101px] h-[41px] -mt-[8.5px] text-white border-[1.5px] border-white rounded-l-full rounded-r-full">{`Login`}</button>
          </div>
        </nav>
      </header>
    </main>
  );
};
