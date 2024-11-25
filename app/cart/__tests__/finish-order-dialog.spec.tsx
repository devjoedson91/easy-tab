import store from "@/store";
import { fireEvent, render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Provider } from "react-redux";
import FinishOrderDialog from "../components/finish-order-dialog";
import { createMocks } from "node-mocks-http";
import { createOrder } from "@/actions";

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

  it("the button submit should be disabled when clicked", async () => {
    const { getByRole } = renderComponent();

    const trigger = getByRole("button", { name: /finalizar/i });

    fireEvent.click(trigger);

    const submit = getByRole("button", { name: /gerar comanda/i });

    fireEvent.click(submit);

    const { res, req } = createMocks({
      method: "POST",
    });

    await createOrder();

    expect(res._getStatusCode()).toBe(200);

    expect(submit.getAttribute("disabled")).toBe(true);
  });
});
