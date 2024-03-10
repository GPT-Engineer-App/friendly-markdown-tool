import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Grid, theme, Container, Heading, FormControl, FormLabel, Input, Button, useToast, List, ListItem, IconButton, Text } from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    // TODO: Implement login logic, API call to /login endpoint
    setIsLoggedIn(true); // Simulate successful login
    toast({
      title: "Login successful.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSignup = async () => {
    // TODO: Implement signup logic, API call to /signup endpoint
    toast({
      title: "Signup successful.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const fetchSchedules = async () => {
    // TODO: Implement fetching schedules logic, API call to /schedules GET endpoint
    // Simulate fetching data
    setSchedules([
      { id: "1", title: "Team Meeting", description: "Discuss project updates" },
      { id: "2", title: "Code Review", description: "Review pull requests" },
    ]);
  };

  const createSchedule = async () => {
    // TODO: Implement schedule creation logic, API call to /schedules POST endpoint
    // Add new schedule to the state for display
    setSchedules([...schedules, { id: Date.now().toString(), title, description }]);
    setTitle("");
    setDescription("");
    toast({
      title: "Schedule created.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteSchedule = async (id) => {
    // TODO: Implement schedule deletion logic, API call to /schedules/{id} DELETE endpoint
    // Remove schedule from state
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
    toast({
      title: "Schedule deleted.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.md" centerContent>
        <VStack spacing={8} py={10}>
          {!isLoggedIn ? (
            <>
              <Heading>Login or Signup</Heading>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button colorScheme="blue" onClick={handleLogin}>
                Login
              </Button>
              <Button colorScheme="teal" onClick={handleSignup}>
                Signup
              </Button>
            </>
          ) : (
            <>
              <Heading>Schedules</Heading>
              <Button colorScheme="teal" onClick={fetchSchedules}>
                Refresh Schedules
              </Button>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </FormControl>
              <FormControl id="description">
                <FormLabel>Description</FormLabel>
                <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
              </FormControl>
              <Button colorScheme="green" leftIcon={<FaPlus />} onClick={createSchedule}>
                Create Schedule
              </Button>
              <List spacing={3}>
                {schedules.map((schedule) => (
                  <ListItem key={schedule.id} d="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Text fontWeight="bold">{schedule.title}</Text>
                      <Text fontSize="sm">{schedule.description}</Text>
                    </Box>
                    <IconButton aria-label="Delete schedule" icon={<FaTrash />} onClick={() => deleteSchedule(schedule.id)} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </VStack>
      </Container>
    </ChakraProvider>
  );
};

export default Index;
