const formatCurrency = n => 
    new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 2,
    }).format(n);

const debounceTimer = (fn, msec) => {
    let lastCall = 0;
    let lastCallTimer;

    return (...arg) => {
        const previousCall = lastCall;
        lastCall = Date.now();

        if (previousCall && ((lastCall - previousCall) <= msec)) {
            clearTimeout(lastCallTimer);
        }

        lastCallTimer = setTimeout(() => {
            fn(...arg);
        }, msec);
    };
};

// Navigation
{
    const navigationLinks = document.querySelectorAll(".navigation__link");
    const calcElems = document.querySelectorAll('.calc');

    for (let i = 0; i < navigationLinks.length; i++) {
        navigationLinks[i].addEventListener('click', (e) => {
            e.preventDefault();

            for (let j = 0; j < calcElems.length; j++) {
                if (navigationLinks[i].dataset.tax === calcElems[j].dataset.tax) {
                    calcElems[j].classList.add('calc_active');
                    navigationLinks[j].classList.add('navigation__link_active');
                } else {
                    calcElems[j].classList.remove("calc_active");
                    navigationLinks[j].classList.remove("navigation__link_active");
                }
            }
        });
    }
}


// АУСН
{
    const ausn = document.querySelector('.ausn');
    const formAusn = ausn.querySelector('.calc__form');
    const resultTaxTotal = ausn.querySelector(".result__tax_total");
    const resultTaxProfit = ausn.querySelector(".result__tax_profit");
    const calcLabelExpenses = ausn.querySelector(".calc__label_expenses");
    const resultBlockProfit = ausn.querySelector('.result__block_profit');

    calcLabelExpenses.style.display = 'none';
    resultBlockProfit.style.display = "none";


    const handlerFormAusn = () => {
      const income = +formAusn.income.value;

      if (formAusn.type.value === "income") {
        calcLabelExpenses.style.display = "none";
        resultBlockProfit.style.display = "none";

        resultTaxTotal.textContent = formatCurrency(income * 0.08);
        formAusn.expenses.value = "";
      }
      if (formAusn.type.value === "expenses") {
        const expenses = +formAusn.expenses.value;
        const profit = income < expenses ? 0 : income - expenses;
        calcLabelExpenses.style.display = "";
        resultBlockProfit.style.display = "";

        resultTaxProfit.textContent = formatCurrency(profit);
        resultTaxTotal.textContent = formatCurrency(profit * 0.2);
      }
    };

    formAusn.addEventListener('reset', () => {
        setTimeout(handlerFormAusn);
    });

  formAusn.addEventListener("input", debounceTimer(handlerFormAusn, 500));

}


// Самозанятый и НПД
{
  const selfEmployment = document.querySelector(".self-employment");
  const formSelfEmployment = selfEmployment.querySelector(".calc__form");
  const resultTaxSelfEmployment = selfEmployment.querySelector(".result__tax");
  const calcCompensation = selfEmployment.querySelector(
    ".calc__label_compensation"
  );
  const resultBlockCompensation = selfEmployment.querySelectorAll(
    ".result__block_compensation "
  );
  const resultTaxCompensation = selfEmployment.querySelector(
    ".result__tax_compensation"
  );
  const resultTaxRestCompensation = selfEmployment.querySelector(
    ".result__tax_rest-compensation"
  );
  const resultTaxResult = selfEmployment.querySelector(".result__tax_result");

  const checkCompensation = () => {
    const setDisplay = formSelfEmployment.addCompensation.checked ? "" : "none";
    calcCompensation.style.display = setDisplay;

    resultBlockCompensation.forEach((elem) => {
      elem.style.display = setDisplay;
    });
  };

  checkCompensation();

  const handlerForm = () => {
    const individual = +formSelfEmployment.individual.value;
    const entity = +formSelfEmployment.entity.value;
    const resIndividual = individual * 0.04;
    const resEntity = entity * 0.06;

    checkCompensation();

    const tax = resIndividual + resEntity;

    formSelfEmployment.compensation.value =
      +formSelfEmployment.compensation.value > 10000
        ? 10000
        : formSelfEmployment.compensation.value;
    const benefit = formSelfEmployment.compensation.value;
    const resBenefit = individual * 0.01 + entity * 0.02;
    const finalBenefit = benefit - resBenefit > 0 ? benefit - resBenefit : 0;
    const finalTax = tax - (benefit - finalBenefit);

    resultTaxSelfEmployment.textContent = formatCurrency(tax);
    resultTaxCompensation.textContent = formatCurrency(benefit - finalBenefit);
    resultTaxRestCompensation.textContent = formatCurrency(finalBenefit);
    resultTaxResult.textContent = formatCurrency(finalTax);
  };

  formSelfEmployment.addEventListener('reset', () => {
    setTimeout(handlerForm);
  });

  formSelfEmployment.addEventListener("input", debounceTimer(handlerForm, 500));
}

// ОСНО
{
    const osno = document.querySelector('.osno');
    const formOsno = osno.querySelector('.calc__form');

    const ndflExpenses = osno.querySelector('.result__block_ndfl-expenses');
    const ndflIncome = osno.querySelector('.result__block_ndfl-income');
    const profit = osno.querySelector(".result__block_profit");

    const resultTaxNds = osno.querySelector(".result__tax_nds");
    const resultTaxProperty = osno.querySelector(".result__tax_property");
    const resultTaxNdflExpenses = osno.querySelector(".result__tax_ndfl-expenses");
    const resultTaxNdflIncome = osno.querySelector(".result__tax_ndfl-income");
    const resultTaxProfitOsno = osno.querySelector(".result__tax_profit");

    const checkFormBusiness = () => {
        if (formOsno.formBusiness.value === 'ИП') {
            ndflExpenses.style.display = '';
            ndflIncome.style.display = '';
            profit.style.display = 'none';
        }

        if (formOsno.formBusiness.value === "ООО") {
            ndflExpenses.style.display = "none";
            ndflIncome.style.display = "none";
            profit.style.display = "";
        }
    };

    const handlerFormOsno = () => {
      checkFormBusiness();

      const income = +formOsno.income.value;
      const expenses = +formOsno.expenses.value;
      const property = +formOsno.property.value;

      const nds = income * 0.2;
      const taxProperty = property * 0.02;
      const profit = income < expenses ? 0 : income - expenses;
      const ndflExpensesTotal = profit * 0.13;
      const ndflIncomeTotal = (income - nds) * 0.13;
      const taxProfit = profit * 0.2;

      resultTaxNds.textContent = formatCurrency(nds);
      resultTaxProperty.textContent = formatCurrency(taxProperty);
      resultTaxNdflExpenses.textContent = formatCurrency(ndflExpensesTotal);
      resultTaxNdflIncome.textContent = formatCurrency(ndflIncomeTotal);
      resultTaxProfitOsno.textContent = formatCurrency(taxProfit);
    };


    formOsno.addEventListener("reset", () => {
      setTimeout(handlerFormOsno);
    });

    formOsno.addEventListener(
      "input",
      debounceTimer(handlerFormOsno, 500)
    );
}
// УСН
{
    const LIMIT = 300000;

    const usn = document.querySelector('.usn');
    const formUsn = usn.querySelector('.calc__form');

    const calcLabelExpenses = usn.querySelector('.calc__label_expenses');
    const calcLabelProperty = usn.querySelector('.calc__label_property');
    const resultBlockProperty = usn.querySelector('.result__block_property');

    const resultTaxTotal = usn.querySelector('.result__tax_total');
    const resultTaxProperty = usn.querySelector('.result__tax_property');

    const checkShopProperty = (typeTax) => {
        switch (typeTax) {
          case "income": {
            calcLabelExpenses.style.display = 'none';
            calcLabelProperty.style.display = "none";
            resultBlockProperty.style.display = "none";

            formUsn.expenses.value = "";
            formUsn.property.value = "";
            break;
          }
          case "ip-expenses": {
            calcLabelExpenses.style.display = "";
            calcLabelProperty.style.display = "none";
            resultBlockProperty.style.display = "none";

            formUsn.property.value = '';
            break;
          }
          case "ooo-expenses": {
            calcLabelExpenses.style.display = "";
            calcLabelProperty.style.display = "";
            resultBlockProperty.style.display = "";
            break;
          }
        }
    };

    const percent = {
        'income': 0.06,
        'ip-expenses': 0.15,
        'ooo-expenses': 0.15,
    };

    checkShopProperty(formUsn.typeTax.value);

    const handlerFormUsn = () => {
        checkShopProperty(formUsn.typeTax.value);

        const income = +formUsn.income.value;
        const expenses = +formUsn.expenses.value;
        const contributions = +formUsn.contributions.value;
        const property = +formUsn.property.value;

        let profit = income - contributions;

        if (formUsn.typeTax.value !== "income") {
          profit -= expenses;
        }

        const taxBigIncome = income > LIMIT ? (profit - LIMIT) * 0.01 : 0;
        const summ = profit - (taxBigIncome < 0 ? 0 : taxBigIncome);
        const tax = summ * percent[formUsn.typeTax.value];
        const taxProperty = property * 0.02;

        resultTaxTotal.textContent = formatCurrency(tax < 0 ? 0 : tax);
        resultTaxProperty.textContent = formatCurrency(taxProperty);
    };


    formUsn.addEventListener('reset', () => {
        setTimeout(handlerFormUsn);
    });
    formUsn.addEventListener(
      "input",
      debounceTimer(handlerFormUsn, 500)
    );
}

// Налоговый вычет 13%

{
    const taxReturn = document.querySelector('.tax-return');
    const formTaxReturn = taxReturn.querySelector('.calc__form');

    const resultTaxNdfl = taxReturn.querySelector('.result__tax_ndfl');
    const resultTaxPossible = taxReturn.querySelector(".result__tax_possible");
    const resultTaxDeduction = taxReturn.querySelector(".result__tax_deduction");


    const handlerFormTaxReturn = () => {
        const expenses = +formTaxReturn.expenses.value;
        const income = +formTaxReturn.income.value;
        const sumExpenses = +formTaxReturn.sumExpenses.value;

        const ndfl = income * 0.13;
        const possibleDeduction =
          expenses < sumExpenses ? expenses * 0.13 : sumExpenses * 0.13;
        const deduction = possibleDeduction < ndfl ? possibleDeduction : ndfl;

        resultTaxNdfl.textContent = formatCurrency(ndfl);
        resultTaxPossible.textContent = formatCurrency(possibleDeduction);
        resultTaxDeduction.textContent = formatCurrency(deduction);
      };

    formTaxReturn.addEventListener('reset', () => {
        setTimeout(handlerFormTaxReturn);
    });
    formTaxReturn.addEventListener(
      "input",
      debounceTimer(handlerFormTaxReturn, 500)
    );
}

