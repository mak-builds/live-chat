"use client";
import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Text,
  Select,
  Input,
} from "@chakra-ui/react";
import React, { useState, useMemo, useCallback, useEffect } from "react";

interface TableProps {
  headings: string[];
  data: {
    id: number;
    nom: string;
    number: string;
    service: string;
  }[];
}

const TableComponent: React.FC<TableProps> = ({ headings, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [nbPerPage, setNbPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
  const [selectedService, setSelectedService] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // Debounce the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const sortedData = useMemo(() => {
    let sortableData = [...data];

    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableData;
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    let filtered = sortedData;
    if (debouncedSearchQuery) {
      filtered = filtered.filter((record) =>
        Object.values(record)
          .join(" ")
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
      );
    }
    if (selectedService) {
      filtered = filtered.filter(
        (record) => record.service === selectedService
      );
    }
    return filtered;
  }, [debouncedSearchQuery, selectedService, sortedData]);

  const numberOfPages = useMemo(
    () => Math.ceil(filteredData.length / nbPerPage),
    [filteredData.length, nbPerPage]
  );

  const records = useMemo(() => {
    const startIndex = (currentPage - 1) * nbPerPage;
    return filteredData.slice(startIndex, startIndex + nbPerPage);
  }, [currentPage, nbPerPage, filteredData]);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, numberOfPages));
  }, [numberOfPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const getPageNumbers = useCallback(() => {
    const start = Math.max(currentPage - 1, 1);
    const end = Math.min(currentPage + 2, numberOfPages);
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, numberOfPages]);

  const handleNbPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setNbPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page whenever the number of items per page changes
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page whenever the search query changes
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(event.target.value);
    setCurrentPage(1); // Reset to the first page whenever the service filter changes
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const uniqueServices = useMemo(() => {
    const services = data.map((record) => record.service);
    return Array.from(new Set(services));
  }, [data]);

  return (
    <Box px={4} py={4} bg="white" borderRadius="md">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Flex>
          <Text mr={2}>Show</Text>
          <Select
            width="100px"
            value={nbPerPage}
            onChange={handleNbPerPageChange}
            mr={2}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </Select>
          <Text>entries per page</Text>
        </Flex>
        <Flex>
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            width="200px"
            mr={4}
          />
          <Select
            placeholder="Filter by service"
            value={selectedService}
            onChange={handleServiceChange}
            width="200px"
          >
            <option value="">All Services</option>
            {uniqueServices.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            {headings.map((heading, index) => (
              <Th
                key={index}
                onClick={() => handleSort(heading.toLowerCase())}
                cursor="pointer"
              >
                {heading}
                {sortConfig?.key === heading.toLowerCase()
                  ? sortConfig.direction === "asc"
                    ? " ↑"
                    : " ↓"
                  : null}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {records.map((record) => (
            <Tr key={record.id}>
              <Td>{record.id}</Td>
              <Td>{record.nom}</Td>
              <Td>{record.number}</Td>
              <Td>{record.service}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justifyContent="space-between" alignItems="center" mt={4}>
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          variant="outline"
        >
          Prev
        </Button>
        <Flex>
          {getPageNumbers().map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              isActive={currentPage === page}
              mx={1}
            >
              {page}
            </Button>
          ))}
        </Flex>
        <Button
          onClick={nextPage}
          disabled={currentPage === numberOfPages}
          variant="outline"
        >
          Next
        </Button>
      </Flex>
      <Flex justifyContent="center" mt={2}>
        <Text>
          Page {currentPage} of {numberOfPages}
        </Text>
      </Flex>
    </Box>
  );
};

export default TableComponent;
