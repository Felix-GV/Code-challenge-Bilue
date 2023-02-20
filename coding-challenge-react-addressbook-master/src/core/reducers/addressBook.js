const defaultState = {
  addresses: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "address/add":
      // prevent duplicate addresses
      if (state.addresses.find((address) => address.id === action.payload.id)) {
        return state;
      }
      return { ...state, addresses: [...state.addresses, action.payload] };
    case "address/remove":
      // rm address from array
      const filteredAddresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
      return { ...state, addresses: filteredAddresses };
    case "addresses/add": {
      return { ...state, addresses: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
