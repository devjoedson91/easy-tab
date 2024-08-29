import cartReducer, { CartProduct, addItemCart } from "..";

describe("Cart Reducer", () => {
  const storagedCart =
    typeof window !== "undefined"
      ? window.localStorage.getItem("@easytab:cart")
      : false;

  it("should return the inital state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual({
      cart: storagedCart ? JSON.parse(storagedCart) : [],
    });
  });

  test("should handle a todo being added to an empty list", () => {
    const previousState: CartProduct[] = [];

    expect(previousState).toEqual([]);
  });
});
