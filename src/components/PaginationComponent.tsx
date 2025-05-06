"use client";
import { useRouter, useSearchParams } from "next/navigation";

import { usePaginationStore } from "@/store/usePaginationStore";

export default function PaginationComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { total } = usePaginationStore();

  const page = parseInt(searchParams.get("page") || "1");
  const goToPage = (pageNumber: number) => {
    const newQueryParams = new URLSearchParams(searchParams.toString());
    newQueryParams.set("page", String(pageNumber));
    router.push(`?${newQueryParams.toString()}`);
  };

  const firstPage = 1;
  let secondPage;
  let thirdPage;
  let fourthPage;
  let fifthPage;
  let sixthPage;
  let seventhPage;
  let eighthPage;

  const lastPage = total;

  if (page < 5) {
    secondPage = 2;
    thirdPage = 3;
    fourthPage = 4;
    fifthPage = 5;
    sixthPage = 6;
    seventhPage = 7;
    eighthPage = "...";
  } else if (page + 4 >= lastPage) {
    secondPage = "...";
    thirdPage = lastPage - 6;
    fourthPage = lastPage - 5;
    fifthPage = lastPage - 4;
    sixthPage = lastPage - 3;
    seventhPage = lastPage - 2;
    eighthPage = lastPage - 1;
  } else {
    secondPage = "...";
    thirdPage = page - 2;
    fourthPage = page - 1;
    fifthPage = page;
    sixthPage = page + 1;
    seventhPage = page + 2;
    eighthPage = "...";
  }

  if (total === 0 || total === 1) {
    return null;
  }

  if (total < 10) {
    return (
      <div className="flex justify-center gap-2 pt-4">
        {Array.from({ length: total }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`
              ${page === pageNumber ? "bg-green-700" : "bg-green-800"} 
              text-lg mb-1 text-white px-4 mx-1 py-2 rounded-4xl cursor-pointer 
              transition-all duration-200 active:scale-85 hover:bg-green-700 hover:scale-105
            `}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex justify-center pt-4">
      {page !== 1 && (
        <button
          onClick={() => goToPage(page - 1)}
          className="text-lg mb-1 bg-green-800 text-white px-4 mx-1 py-2 rounded-4xl cursor-pointer
    transition-all duration-200 active:scale-85 hover:bg-green-700 hover:scale-105"
        >
          {"<"}
        </button>
      )}

      <button
        onClick={() => goToPage(firstPage)}
        className={`${page === firstPage ? "bg-green-700" : "bg-green-800"} text-lg mb-1 text-white px-4 mx-1 py-2 
        rounded-4xl cursor-pointer  transition-all duration-200 active:scale-85 hover:bg-green-700 hover:scale-105`}
      >
        {firstPage}
      </button>
      <button
        disabled={secondPage.toString() === "..."}
        onClick={() => goToPage(Number(secondPage))}
        className={`${page === secondPage ? "bg-green-700" : "bg-green-800"} ${secondPage === "..." ? "pointer-events-none" : ""} 
        text-lg mb-1 text-white px-4 mx-1 py-2 rounded-4xl cursor-pointer transition-all duration-200 active:scale-85
         hover:bg-green-700 hover:scale-105`}
      >
        {secondPage}
      </button>
      <button
        onClick={() => goToPage(thirdPage)}
        className={`${page === thirdPage ? "bg-green-700" : "bg-green-800"} text-lg mb-1 text-white px-4 mx-1 py-2 rounded-4xl 
        cursor-pointer transition-all duration-200 active:scale-85 hover:bg-green-700 hover:scale-105`}
      >
        {thirdPage}
      </button>
      <button
        onClick={() => goToPage(fourthPage)}
        className={`${page === fourthPage ? "bg-green-700" : "bg-green-800"} text-lg mb-1 text-white px-4 mx-1 py-2 rounded-4xl 
        cursor-pointer transition-all duration-200 active:scale-85 hover:bg-green-700 hover:scale-105`}
      >
        {fourthPage}
      </button>
      <button
        onClick={() => goToPage(fifthPage)}
        className={`${page === fifthPage ? "bg-green-700" : "bg-green-800"} text-lg mb-1   text-white px-4 mx-1 py-2 rounded-4xl 
        cursor-pointer transition-all duration-200 active:scale-85 hover:bg-green-700 hover:scale-105`}
      >
        {fifthPage}
      </button>
      <button
        onClick={() => goToPage(sixthPage)}
        className={`${page === sixthPage ? "bg-green-700" : "bg-green-800"} text-lg mb-1 text-white px-4 mx-1 py-2 rounded-4xl 
        cursor-pointer transition-all duration-200 active:scale-85 hover:bg-green-700 hover:scale-105`}
      >
        {sixthPage}
      </button>

      <button
        onClick={() => goToPage(seventhPage)}
        className={`${page === seventhPage ? "bg-green-700" : "bg-green-800"} text-lg mb-1 text-white px-4 mx-1 py-2 rounded-4xl 
        cursor-pointer transition-all duration-200 active:scale-85 hover:bg-green-700 hover:scale-105`}
      >
        {seventhPage}
      </button>

      <button
        disabled={eighthPage.toString() === "..."}
        onClick={() => goToPage(Number(eighthPage))}
        className={`${page === eighthPage ? "bg-green-700" : "bg-green-800"} ${
          eighthPage.toString() === "..." ? "pointer-events-none" : ""
        }  text-lg mb-1 text-white px-4 mx-1 py-2 rounded-4xl cursor-pointer  transition-all duration-200 active:scale-85 
          hover:bg-green-700 hover:scale-105`}
      >
        {eighthPage}
      </button>

      <button
        onClick={() => goToPage(lastPage)}
        className={`${page === lastPage ? "bg-green-700" : "bg-green-800"}  text-lg mb-1  text-white px-4 mx-1 py-2 rounded-4xl 
        cursor-pointer transition-all duration-200 active:scale-85 hover:bg-green-700 hover:scale-105`}
      >
        {lastPage}
      </button>
      {page !== lastPage && (
        <button
          onClick={() => goToPage(page + 1)}
          className="text-lg mb-1 bg-green-800 text-white px-4 mx-1 py-2 rounded-4xl  cursor-pointer
    transition-all duration-200 active:scale-85 hover:bg-green-700 hover:scale-105"
        >
          {">"}
        </button>
      )}
    </div>
  );
}
