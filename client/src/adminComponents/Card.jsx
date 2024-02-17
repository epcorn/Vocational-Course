
export default function Card(props) {
  return (
    <div
      className={`w-full border cursor-pointer border-teal-500  hover:border-2 overflow-hidden rounded-lg sm:w-[200px] bg-sky-500 ${props.moreClasses}`}
    >
      <div className="p-3 flex items-center justify-center h-full gap-2 ">
        {props.children}
      </div>
    </div>
  );
}
