import React, { useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import useFirestoreCollection from "../../app/hooks/useFirestoreCollection";
import { ListenToFoundPersonsFromFireStore } from "../../app/firebase/firestoreService";
import { listenToFoundPerson } from "../AddFoundPerson/AddFoundPersonActions";
import "../../css/homepage.css";
import {
  Card,
  Image,
  Placeholder,
  Search,
  Label,
  Dropdown,
  Grid,
  Segment,
} from "semantic-ui-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { cities, gender } from "../../app/api/categoryOptions";

export default function MissingPersonTimline() {
  const dispatched = useDispatch();
  const { FoundPerson } = useSelector((state) => state.FoundPerson);
  const { loading } = useSelector((state) => state.async);

  const [predicate, setPredicate] = useState(new Map([["filter", "all"]]));
  const [searchValue, setSearchValue] = useState("");

  const initialState = {
    loading1: false,
    results: [],
    value: "",
  };

  function handleSetPredicate(key, value, value1) {
    setPredicate(new Map(predicate.set(key, value)));
    setSearchValue(value1);
    console.log(searchValue);
  }

  useFirestoreCollection({
    query: () => ListenToFoundPersonsFromFireStore(predicate, searchValue),
    data: (FoundPerson) => dispatched(listenToFoundPerson(FoundPerson)),
    deps: [dispatched, predicate, searchValue],
  });

  function exampleReducer(state, action) {
    switch (action.type) {
      case "CLEAN_QUERY":
        return initialState;
      case "START_SEARCH":
        return { ...state, loading1: true, value: action.query };
      case "FINISH_SEARCH":
        return { ...state, loading1: false, results: action.results };
      case "UPDATE_SELECTION":
        return { ...state, value: action.selection };

      default:
        throw new Error();
    }
  }

  const resultRenderer = ({ name }) => <Label content={name} />;
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading1, results, value } = state;
  const timeoutRef = React.useRef();

  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: "START_SEARCH", query: data.value });

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: "CLEAN_QUERY" });
        return;
      }

      const re = new RegExp(_.escapeRegExp(data.value), "i");
      const isMatch = (result) => re.test(result.name);

      dispatch({
        type: "FINISH_SEARCH",
        results: _.filter(FoundPerson, isMatch),
      });
    }, 300);
  }, []);
  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <Segment vertical>
        <Grid container stackable columns={3}>
          <Grid.Column>
            {" "}
            <Search
              loading={loading1}
              onResultSelect={(e, data) =>
                dispatch({
                  type: "UPDATE_SELECTION",
                  selection: data.result.name,
                })
              }
              onSearchChange={handleSearchChange}
              resultRenderer={resultRenderer}
              results={results}
              value={value}
              placeholder="Search By Name"
            />
          </Grid.Column>
          <Grid.Column>
            {" "}
            <Dropdown
              placeholder="City"
              search
              selection
              options={cities}
              value={value}
              onChange={(e, { value }) =>
                handleSetPredicate("filter", "Cities", value)
              }
            />
          </Grid.Column>
          <Grid.Column>
            {" "}
            <Dropdown
              placeholder="Gender"
              selection
              options={gender}
              value={value}
              onChange={(e, { value }) =>
                handleSetPredicate("filter", "Gender", value)
              }
            />
          </Grid.Column>
        </Grid>
      </Segment>

      <Card.Group itemsPerRow={4} style={{ padding: "5px" }}>
        {results.map((result) => (
          <Card key={result.id}>
            {loading ? (
              <Placeholder>
                <Placeholder.Image square />
              </Placeholder>
            ) : (
              <Image src={result.mediaUrl} wrapped ui={false} />
            )}
            <Card.Content>
              <Card.Header>{result.name}</Card.Header>
              <Card.Meta>
                Missing Since:
                {format(result.dateFound, "MMM d, yyyy h:mm a")}
              </Card.Meta>
              <Card.Meta>City:{result.city.address || result.city}</Card.Meta>
              <Card.Description>
                <Link to={`/wrapper/${result.id}`}>Further Details</Link>
              </Card.Description>
            </Card.Content>
            <Card.Content extra></Card.Content>
          </Card>
        ))}
      </Card.Group>

      <Card.Group>
        {FoundPerson.map((event) => (
          <div className="display">
            <Card
              key={event.id}
              as={Link}
              to={`/timelineFoundWrapper/${event.id}`}
            >
              {loading ? (
                <Placeholder>
                  <Placeholder.Image square />
                </Placeholder>
              ) : (
                <Image src={event.mediaUrl} wrapped ui={false} size="medium" />
              )}

              <Card.Content>
                <Label as="a" color="teal" ribbon>
                  Found
                </Label>
                <Card.Header>{event.name}</Card.Header>
                <Card.Meta>
                  Missing Since:
                  {format(event.dateFound, "MMM d, yyyy h:mm a")}
                </Card.Meta>
                <Card.Meta>City:{event.city.address || event.city}</Card.Meta>
                <Card.Description>
                  <Link to={`/timelineFoundWrapper/${event.id}`}>
                    Further Details
                  </Link>
                </Card.Description>
              </Card.Content>
              <Card.Content extra></Card.Content>
            </Card>
          </div>
        ))}
      </Card.Group>
    </>
  );
}
