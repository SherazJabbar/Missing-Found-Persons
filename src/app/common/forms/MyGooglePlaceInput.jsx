import React from 'react';
import { useField } from 'formik';
import { FormField, Label, Segment, List } from 'semantic-ui-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export default function MyGooglePlaceInput({ label, options, ...props }) {
  const [field, meta, helpers] = useField(props);

  function handleSelect(policeStationWhereReported) {
    geocodeByAddress(policeStationWhereReported)
      .then((results) => getLatLng(results[0]))
      .then(() => helpers.setValue(policeStationWhereReported.name))
      .catch((error) => helpers.setError(error));
  }

//   function handleBlur(e) {
//       field.onBlur(e);
//       if (!field.value.latLng) {
//           helpers.setValue({policeStationWhereReported: ''})
//       }
//   }
// onBlur: (e) => handleBlur(e),
  return (
    <PlacesAutocomplete
      value={field.value['policeStationWhereReported']}
      onChange={(value) => helpers.setValue({policeStationWhereReported:value})}
      onSelect={(value) => handleSelect(value)}
      searchOptions={options}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <FormField error={meta.touched && !!meta.error}>
          <input {...getInputProps({ name: field.name,  ...props })} />
          {meta.touched && meta.error ? (
            <Label basic color='red'>
              {meta.error['policeStationWhereReported']}
            </Label>
          ) : null}
          {suggestions?.length > 0 && (
            <Segment
              loading={loading}
              style={{
                marginTop: 0,
                position: 'absolute',
                zIndex: 1000,
                width: '100%',
              }}
            >
              <List selection>
                {suggestions.map((suggestion) => (
                  <List.Item {...getSuggestionItemProps(suggestion)}>
                    <List.Header>
                      {suggestion.formattedSuggestion.mainText}
                    </List.Header>
                    <List.Description>
                      {suggestion.formattedSuggestion.secondaryText}
                    </List.Description>
                  </List.Item>
                ))}
              </List>
            </Segment>
          )}
        </FormField>
      )}
    </PlacesAutocomplete>
  );
}