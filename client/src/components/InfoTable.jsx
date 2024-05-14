import { Button, Table } from "flowbite-react";
import React, { useState } from "react";
import CustomModal from "./CustomModal";
import Payment from "./Payment";

const InfoTable = ({ name, email, id, address }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-x-auto w-full ">
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>email</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>{address}</Table.Cell>
            <Table.Cell>
              <Button
                gradientDuoTone="tealToLime"
                onClick={() => setOpen(true)}
              >
                Upload Payment Details
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <CustomModal isOpen={open} onClose={() => setOpen(!open)}>
        <Payment id={id} onClose={() => setOpen(!open)} />
      </CustomModal>
    </div>
  );
};

export { InfoTable };
