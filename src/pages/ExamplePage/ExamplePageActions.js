export const ACTION1 = 'ACTION1';

export const launchAction1 = (dataExample) => {
  return {
    type: ACTION1,
    payload: {
      dataExample,
    },
  };
};

