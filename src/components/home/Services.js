import React, { useState } from "react";
import { Box, Card, CardContent, Typography, CardMedia, Button, Pagination, Grid } from "@mui/material";

const Services = ({ onSelect }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 4;

  const servicesData = [
    { id: 1, title: "Service 1", description: "Description for Service 1", imageUrl: "https://picsum.photos/800/600?random=1" },
    { id: 2, title: "Service 2", description: "Description for Service 2", imageUrl: "https://picsum.photos/800/600?random=2" },
    { id: 3, title: "Service 3", description: "Description for Service 3", imageUrl: "https://picsum.photos/800/600?random=3" },
    { id: 4, title: "Service 4", description: "Description for Service 4", imageUrl: "https://picsum.photos/800/600?random=4" },
    { id: 5, title: "Service 5", description: "Description for Service 5", imageUrl: "https://picsum.photos/800/600?random=5" },
    { id: 6, title: "Service 6", description: "Description for Service 6", imageUrl: "https://picsum.photos/800/600?random=6" },
    { id: 7, title: "Service 7", description: "Description for Service 7", imageUrl: "https://picsum.photos/800/600?random=7" },
    // Add more services as needed
    // ... (Add 10 cards here)
  ];

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = servicesData.slice(indexOfFirstService, indexOfLastService);

  const toggleServiceSelection = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      // Deselect the service
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      // Select the service
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const handleSelect = () => {
    // Ensure that selectedIds is always an array
    const selectedIds = selectedServices.length === 1 ? [selectedServices[0]] : [...selectedServices];
    onSelect(selectedIds);
  
    // Alert the selected service IDs
    alert(`Selected service ID(s): ${selectedIds.join(', ')}`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box style={{ height: "100%" }}>
      <Grid container spacing={2} style={{ height: "95%" }}>
        {currentServices.map((service) => (
          <Grid item key={service.id} xs={12} sm={6}>
            <Card style={{ marginBottom: "20px" }}>
              <CardMedia
                component="img"
                alt={service.title}
                height="100"
                image={service.imageUrl}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
                <Button
                  variant={selectedServices.includes(service.id) ? "contained" : "outlined"}
                  onClick={() => toggleServiceSelection(service.id)}
                >
                  {selectedServices.includes(service.id) ? "Deselect" : "Select"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} style={{ height: "auto" }}>
        <Grid item xs={12}>
          <Pagination
            count={Math.ceil(servicesData.length / servicesPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSelect}>
            Confirm Selection
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Services;
