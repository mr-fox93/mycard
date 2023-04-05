import "./App.css";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";

function App() {
  const [array, setArray] = useState([]);
  const [search, setSearch] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=20")
      .then((res) => res.json())
      .then((data) => setArray(data.results));
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const filterData = array.filter((item) => {
    return (
      item.name.first.toLowerCase().includes(search.toLowerCase()) ||
      item.name.last.toLowerCase().includes(search.toLowerCase()) ||
      item.dob.age.toString().includes(search)
    );
  });

  return (
    <div className={`App ${isDarkMode ? "dark" : ""}`}>
      <div className={`header ${isDarkMode ? "dark" : ""}`}>
        <input
          placeholder="search..."
          className={`input ${isDarkMode ? "dark" : ""}`}
          type={"text"}
          onChange={handleChange}
          value={search}
        ></input>
        <Switch
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
        />
      </div>
      <TableContainer
        className={`table ${isDarkMode ? "dark" : ""}`}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData.map((item) => (
              <TableRow key={item.login.uuid}>
                <TableCell className={`tb ${isDarkMode ? "dark" : ""}`}>
                  {item.name.first}
                </TableCell>
                <TableCell>{item.name.last}</TableCell>
                <TableCell>{item.dob.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
