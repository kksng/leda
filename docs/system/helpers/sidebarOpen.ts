export const setIsSidebarOpen = (state: boolean) => {
  localStorage.setItem('isOpen', state.toString());
};

export const getIsSidebarOpen = (): boolean => {
  const isOpen = localStorage.getItem('isOpen');

  if (isOpen == null) {
    setIsSidebarOpen(true);

    return true;
  }

  return isOpen === 'true';
};
