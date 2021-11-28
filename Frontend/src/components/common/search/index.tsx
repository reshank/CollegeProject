import React, { useState, useCallback, useEffect, useRef } from "react";
import { Flex, InputGroup, InputRightElement, Input } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Suggestions from "./Suggestions";
import debounce from "lodash.debounce";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [text, setText] = useState<string>("");
  const router = useRouter();
  const searchRef = useRef(null);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.replace({
      pathname: `/[shop_name]/search`,
      query: {
        ...router.query,
        query: query,
      },
    });
  };

  const delayedQuery = useCallback(
    debounce((q) => setQuery(q), 1000),
    []
  );

  const onChange = (e) => {
    setText(e.target.value);
    if (e.target.value?.length >= 1 && e.target.value !== " ") {
      setShow(true);
    } else {
      setShow(false);
    }
    delayedQuery(e.target.value);
  };

  return (
    <Flex w="40%" display={["none", "none", "none", "block"]} ref={searchRef}>
      <form onSubmit={handleSubmit}>
        <InputGroup position="relative">
          <Input
            type="text"
            placeholder="Search your products here..."
            bg="gray.100"
            value={text}
            onChange={onChange}
          />
          <InputRightElement
            type="submit"
            pointerEvents="none"
            children={<Search2Icon color="black" />}
          />
        </InputGroup>
      </form>
      <Suggestions setShow={setShow} query={query} show={show} />
    </Flex>
  );
};

export default Search;
