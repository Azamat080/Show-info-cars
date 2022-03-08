import React, { useState } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { BsCreditCard2Back } from 'react-icons/bs';
import { FaCarAlt } from 'react-icons/fa';



const FormData = () => {
  const [data, setData] = useState({
    plate_number: "",
    tech_pass: ""
  });

  const [carData, setCardata] = useState();

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      plate_number: data.plate_number,
      tech_pass: data.tech_pass,
    };
    axios
      .post("https://api-dtp.yhxbb.uz/api/egov/open_data/info_car/", userData)
      .then((response) => {
        setCardata(response.data);
        console.log(carData);
      });
  };
  return (
    <div>
      <nav className="container-fluid header">
        <div className="d-flex align-items-center justify-content-center">
          <img className="img-fluid" style={{ width: '80px' }} src="./logo.svg" alt="" />
          <h3 className='mx-2'>Avto transport vositalari ma’lumotlari</h3>
        </div>
      </nav>
      <section className='main'>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 sec-form">
              <form onSubmit={handleSubmit}>
                <label htmlFor="plate_number" className="form-lable">Mashina davlat raqami:</label>
                <div className="input-group mb-3">
                  <span className="input-group-text"><FaCarAlt /></span>
                  <input type="text" name="plate_number" value={data.plate_number} onChange={handleChange} className="form-control" placeholder="Mashina raqami" />
                </div>
                <label htmlFor="tech_pass">Tex Passport seriya raqam</label>
                <div className="input-group">
                  <span className="input-group-text"><BsCreditCard2Back /></span>
                  <input type="text" className="form-control" placeholder="Texnik ko`rik raqami" name="tech_pass" value={data.tech_pass} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-warning btn-sm my-2" >Tekshirish</button>
              </form>
            </div>

            <div className="col-lg-9 sec-info m-0 p-0">
              <Table className="table table-striped table-bordered hover rounded">
                <Thead>
                  <Tr>
                    <Th>Mashina</Th>
                    <Th>Ma'lumoti</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {carData && Object.entries(carData).map(([k, v]) => {
                        return (
                          <Tr key={k.id}>
                            <Td>{k}</Td>
                            <Td>{v}</Td>
                          </Tr>
                        );
                      })}
                </Tbody>
              </Table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormData