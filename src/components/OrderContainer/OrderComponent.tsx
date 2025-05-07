"use client";

import dayjs from "dayjs";
import { useState } from "react";

import OrderCommentComponent from "@/components/OrderContainer/OrderCommentComponent";
import { IOrder } from "@/interfaces/orderInterface";

interface IOrderProps {
  order: IOrder;
  isDark: boolean;
}

export default function OrderComponent({ order, isDark }: IOrderProps) {
  const [details, setDetails] = useState<string | null>(null);
  const {
    _id,
    name,
    surname,
    email,
    phone,
    age,
    course,
    course_format,
    course_type,
    sum,
    already_paid,
    created_at,
    status,
    group,
    manager,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    msg,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    utm,
  } = order;

  function handleDetail(id: string) {
    if (details === id) {
      setDetails(null);
    } else {
      setDetails(id);
    }
  }

  return (
    <>
      <div
        className={` flex flex-row  gap-2 cursor-pointer ${details === _id ? "bg-green-800" : isDark ? "bg-gray-400" : "bg-white"}`}
        onClick={() => handleDetail(_id)}
      >
        <p className="w-1/12 truncate overflow-hidden text-ellipsis whitespace-nowrap " title={_id ?? ""}>
          {_id}
        </p>
        <p
          className="w-1/12 truncate overflow-hidden text-ellipsis whitespace-nowrap text-transform: capitalize"
          title={name.charAt(0).toUpperCase() + name.slice(1)}
        >
          {name}
        </p>
        <p
          className="w-1/12 truncate overflow-hidden text-ellipsis whitespace-nowrap text-transform: capitalize"
          title={surname.charAt(0).toUpperCase() + surname.slice(1)}
        >
          {surname}
        </p>
        <p className="w-1/12 truncate overflow-hidden text-ellipsis whitespace-nowrap " title={email ?? ""}>
          {email}
        </p>
        <p className="w-1/12 truncate overflow-hidden text-ellipsis whitespace-nowrap text-center" title={phone ?? ""}>
          {phone}
        </p>
        <p className="w-1/24 truncate overflow-hidden text-ellipsis whitespace-nowrap  text-center" title={age?.toString() ?? ""}>
          {age}
        </p>
        <p className="w-1/12 truncate overflow-hidden text-ellipsis whitespace-nowrap  text-center" title={course ?? ""}>
          {course}
        </p>
        <p className="w-1/12 truncate overflow-hidden text-ellipsis whitespace-nowrap  text-center" title={course_format ?? ""}>
          {course_format}
        </p>
        <p className="w-1/12 truncate overflow-hidden text-ellipsis whitespace-nowrap  text-center" title={course_type ?? ""}>
          {course_type}
        </p>
        <p className="w-1/12 truncate overflow-hidden text-ellipsis whitespace-nowrap  text-center" title={sum?.toString() ?? ""}>
          {sum}
        </p>
        <p className="w-1/12 truncate overflow-hidden text-ellipsis whitespace-nowrap  text-center" title={already_paid?.toString() ?? ""}>
          {already_paid}
        </p>
        <p
          className="w-1/12 truncate overflow-hidden text-ellipsis whitespace-nowrap  text-center"
          title={dayjs(created_at).format("DD.MM.YYYY").toString() ?? ""}
        >
          {dayjs(created_at).format("DD.MM.YYYY")}
        </p>
        <p className="w-1/12 truncate overflow-hidden text-ellipsis whitespace-nowrap   text-center" title={status?.toString() ?? ""}>
          {status}
        </p>
        <p className="w-1/12 truncate overflow-hidden text-ellipsis whitespace-nowrap   text-center" title={group?.group?.toString() ?? ""}>
          {group?.group}
        </p>
        <p className="w-1/12 truncate overflow-hidden text-ellipsis whitespace-nowrap   text-center" title={manager?.name ?? ""}>
          {manager?.name}
        </p>
      </div>
      {details === _id && <OrderCommentComponent order={order} />}
    </>
  );
}
