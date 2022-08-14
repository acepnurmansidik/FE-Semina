import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import TbodyWithAction from "../TbodyWithAction";
import Thead from "../Thead";
import Pagination from "../Pagination";

export default function TableWithAction({
  thead,
  withoutPagination,
  handlePageClick,
  actionNotDisplay,
  data,
  tbody,
  editUrl,
  deleteAction,
  customAction,
  status,
  pages,
}) {
  return (
    <>
      <Table className="mt-3" striped bordered hover>
        <Thead texts={thead} />
        <TbodyWithAction
          status={status}
          data={data}
          display={tbody}
          editUrl={editUrl}
          deleteAction={deleteAction}
          customAction={customAction}
          actionNotDisplay={actionNotDisplay}
        />
      </Table>
      {!withoutPagination && data.length ? (
        <Pagination pages={pages} handlePageClick={handlePageClick} />
      ) : (
        ""
      )}
    </>
  );
}
