import store from "@/store";
import { fireEvent, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Provider } from "react-redux";
import FinishOrderDialog from "../components/finish-order-dialog";

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <FinishOrderDialog />
    </Provider>
  );
};

describe("Finish order dialog", () => {
  it("should call handleChange function on each key pressed", async () => {
    const { getByRole, getByPlaceholderText, debug } = renderComponent();

    const trigger = getByRole("button", { name: /finalizar/i });

    fireEvent.click(trigger);

    const input = getByPlaceholderText(/client/i);

    const inputValue = "client name";

    await userEvent.type(input, inputValue);

    expect(input.getAttribute("value")).toBe(inputValue);
  });
});
