import { render, screen } from "@testing-library/react";
import { Loader } from "../../components/Loader.js";

test("loader has grid component", () => {
  render(<Loader></Loader>);

  const gridLoader = screen.getByLabelText("loading-indicator");

  expect(gridLoader).toBeInTheDocument();
});
