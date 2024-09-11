import React, { useEffect, useState } from "react";
import Papa from "papaparse"; // For CSV parsing
import * as XLSX from "xlsx"; // For Excel parsing
import { Uploader } from "rsuite";
import MobileUploadBillModal from "./MobileUploadBillModal";
import { DataChange } from "./DateChange";

const UploaderFile = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [openUploadModal, setOpenUploadModal] = useState(false);

  console.log("data", data);

  const handleFileUpload = (fileList: any) => {
    const file = fileList[0]?.blobFile;
    const reader = new FileReader();

    if (file && file.name.endsWith(".csv")) {
      reader.onload = () => {
        const csvData: any = Papa.parse(reader.result as string, {
          header: true,
        });

        // Ensure filtering out objects where billDate is null
        const filteredData = csvData.data.filter((item: any) => item.billDate);

        setData(filteredData); // Set filtered data without null billDate
        //@ts-ignore
        setColumns(Object.keys(filteredData[0]));
      };
      reader.readAsText(file);
    } else if (file && file.name.endsWith(".xlsx")) {
      reader.onload = (e: any) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet: any = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        );

        // Remove the __rowNum__ field and filter out null billDate
        const cleanedData = worksheet
          .map(({ __rowNum__, ...rest }: any) => rest)
          .filter((item: any) => item.billDate);

        setData(cleanedData); // Set cleaned data without null billDate
        //@ts-ignore
        setColumns(Object.keys(cleanedData[0]));
      };
      reader.readAsBinaryString(file);
    }
  };

  // Open modal when data length is greater than 0
  useEffect(() => {
    if (data.length > 0) {
      setOpenUploadModal(true);
    }
  }, [data]);

  const handleCloseEdit = () => setOpenUploadModal(false);

  return (
    <div>
      <div>
        <Uploader
          accept=".csv,.xlsx"
          autoUpload={false}
          action=""
          onChange={handleFileUpload}
          appearance="primary"
          draggable
        >
          <div
            style={{
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>Click or Drag files to this area to upload</span>
          </div>
        </Uploader>
      </div>

      <div>
        <MobileUploadBillModal
          open={openUploadModal}
          onClose={handleCloseEdit}
          data={data}
        />
      </div>
    </div>
  );
};

export default UploaderFile;
