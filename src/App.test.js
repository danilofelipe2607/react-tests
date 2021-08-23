import React from "react";
import App, { calcularNovoSaldo } from "./App";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Componente principal", () => {
  describe("Quando eu abro o App do banco", () => {
    it(" nome é exibido", () => {
      render(<App />);
      expect(screen.getByText("ByteBank")).toBeInTheDocument();
    });
    it("exibe Saldo", () => {
      render(<App />);
      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });
    it("exibe Realizar operação", () => {
      render(<App />);
      expect(screen.getByText("Realizar operação")).toBeInTheDocument();
    });
  });
  describe("Quando e realizo uma transação", () => {
    it("Saque-Diminuir", () => {
      const valores = {
        transacao: "saque",
        valor: 50,
      };
      const novoSaldo = calcularNovoSaldo(valores, 150);
      expect(novoSaldo).toBe(100);
    });
    it("que é um saque , a transação deve se realizada", () => {
      const { getByText, getByLabelText, getByTestId } = render(<App />);
      const saldo = getByText("R$ 1000");
      const transacao = getByLabelText("Saque");
      const valor = getByTestId("valor");
      const botaoTransacao = getByText("Realizar operação");

      expect(saldo.textContent).toBe("R$ 1000");
      fireEvent.click(transacao, { target: { value: "saque" } });
      fireEvent.change(valor, { target: { value: 10 } });
      fireEvent.click(botaoTransacao);
      expect(saldo.textContent).toBe("R$ 990");
    });
  });
});
