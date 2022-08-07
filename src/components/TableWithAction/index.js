import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { config } from "../../configs";
import SButton from "../Button";

export default function TableWithAction() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategoriesAPI = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${config.api_host_dev}/cms/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      setData(response.data.data);
    } catch (err) {
      console.log(err.response.msg);
    }
  };
  console.log(data);

  useEffect(() => {
    getCategoriesAPI();
  }, []);

  return (
    <Table className="mt-3" striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <td colSpan={3} style={{ textAlign: "center" }}>
            <div class="flex items-center justify-center">
              <Spinner animation="grow" variant="secondary" />
            </div>
          </td>
        ) : (
          data.map((data, i) => (
            <tr key={i + 1}>
              <td>{i + 1}</td>
              <td>{data.name}</td>
              <td>
                <SButton variant={"warning"}>Edit</SButton>
                <SButton variant={"danger"}>Delete</SButton>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
