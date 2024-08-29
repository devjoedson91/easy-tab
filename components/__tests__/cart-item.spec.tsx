import { screen, render, fireEvent } from "@testing-library/react";
import CartItem, { CartProps } from "../cart-item";
import { Provider } from "react-redux";
import store from "@/store";
import { cartPropsMock } from "../mocks/cart-item";

const renderComponent = (cart: CartProps) => {
  return render(
    <Provider store={store}>
      <CartItem item={cart} />
    </Provider>
  );
};

describe("<CartItem />", () => {
  it("should rendered correctly", () => {
    const { getByRole, getByText } = renderComponent(cartPropsMock);

    const productName = getByText(/sorvete especial/i);

    expect(getByRole("img", { name: cartPropsMock.name })).toBeInTheDocument();

    expect(
      getByRole("heading", { name: cartPropsMock.amount.toString() })
    ).toBeInTheDocument();

    expect(productName).toBeInTheDocument();
  });

  it("should format the number as BRL currency", () => {
    const { getByText } = renderComponent(cartPropsMock);

    expect(getByText("R$ 30,00")).toBeInTheDocument();
  });

  it("it should match snapshot", () => {
    const { container } = renderComponent(cartPropsMock);

    expect(container.firstChild).toMatchSnapshot();
  });

  it("items amount control", () => {
    const { getByTestId } = renderComponent(cartPropsMock);

    const button = getByTestId("remove-item");

    fireEvent.click(button);
  });
});
