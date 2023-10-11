import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import { range } from "lodash";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

/**
 * @REFACTOR
 * use one big state object
 * make it more like a stepper
 * separate thousands by commas
 * fix title at top of page
 * remove advanced
 * separate equity out, make it answer one simple question
 * have a basic event handler function
 * move calcs to helpers
 * write tests
 * add validation
 * add graphs
 * persit for user
 */
export default function Settings() {
  const [originalTerm, setOriginalTerm] = React.useState(30);
  const [remainingTerm, setRemainingTerm] = React.useState(30);
  const [appraisalAmount, setAppraisalAmount] = React.useState(500000);
  const [originalBalance, setOriginalBalance] = React.useState(500000);
  const [remainingBalance, setRemainingBalance] = React.useState(500000);
  const [prepaidPrincipal, setPrepaidPrinciple] = React.useState(20000);
  const [couponRate, setCouponRate] = React.useState(5);
  const [couponRateType, setCouponRateType] = React.useState<string>("fixed");
  const [monthlyPayment, setMontlyPayment] = React.useState(0);
  const [equity, setEquity] = React.useState(0);
  const [loanToValueRatio, setLoanToValueRatio] = React.useState(0);
  const [totalRepayment, setTotalRepayment] = React.useState(0);
  const [interestPaid, setInterestPaid] = React.useState(0);
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const paymentsPerYear = 12;

  const dollarAdornment = {
    startAdornment: <InputAdornment position="start">$</InputAdornment>,
  };

  const percentageAdornment = {
    endAdornment: <InputAdornment position="end">%</InputAdornment>,
  };

  const yearsAdornment = {
    endAdornment: <InputAdornment position="end">years</InputAdornment>,
  };

  const handleOriginalTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOriginalTerm(Number(event.target.value));
  };

  const handleSliderOriginalTermChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    setOriginalTerm(Number(value));
  };

  const handleRemainingTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRemainingTerm(Number(event.target.value));
  };

  const handleOriginalBalanceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOriginalBalance(Number(event.target.value));
  };

  const handleSliderOriginalBalanceChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    setOriginalBalance(Number(value));
  };

  const handleAppraisalAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAppraisalAmount(Number(event.target.value));
  };

  const handleRemainingBalanceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRemainingBalance(Number(event.target.value));
  };

  const handleCouponRateTypeChange = (event: SelectChangeEvent) => {
    setCouponRateType(event.target.value as string);
  };

  const handlePrepaidPrincipalChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrepaidPrinciple(Number(event.target.value));
  };

  const handleCouponRateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCouponRate(Number(event.target.value));
  };

  const handleShowAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  React.useEffect(() => {
    const originalTermMonths = originalTerm * paymentsPerYear;
    // const remainingTermMonths = remainingTerm * paymentsPerYear;
    // const age = originalTerm - remainingTerm;

    const loanToValueRatio = Math.round(
      (remainingBalance / appraisalAmount) * 100
    );

    setLoanToValueRatio(loanToValueRatio);

    const equity = appraisalAmount - remainingBalance;

    setEquity(equity);

    const r = couponRate / 100 / paymentsPerYear;

    let seriesSum = 0;

    for (const month of range(1, originalTermMonths + 1)) {
      const part = 1 / (1 + r) ** month;
      seriesSum += part;
    }

    const monthlyPayment = originalBalance / seriesSum;

    setMontlyPayment(Math.round(monthlyPayment));

    const totalRepayment = monthlyPayment * originalTermMonths;

    setTotalRepayment(Math.round(totalRepayment));

    const interestPaid = totalRepayment - originalBalance;

    setInterestPaid(Math.round(interestPaid));
  }, [
    originalTerm,
    remainingTerm,
    appraisalAmount,
    remainingBalance,
    couponRate,
    originalBalance,
  ]);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Card sx={{ mt: 4, pt: 2 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            How Much?
          </Typography>
          <Slider
            sx={{ my: 8 }}
            track={false}
            step={10000}
            marks
            min={10000}
            max={originalBalance > 1000000 ? originalBalance : 1000000}
            valueLabelDisplay="on"
            value={originalBalance}
            onChange={handleSliderOriginalBalanceChange}
          />
          <TextField
            id="outlined-number"
            label="Opening Loan Amount"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={dollarAdornment}
            value={originalBalance}
            onChange={handleOriginalBalanceChange}
          />
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            How Long?
          </Typography>
          <Slider
            sx={{ my: 8 }}
            track={false}
            step={5}
            marks
            min={0}
            max={50}
            valueLabelDisplay="on"
            value={originalTerm}
            onChange={handleSliderOriginalTermChange}
          />
          <TextField
            id="outlined-number"
            label="Original Term"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={yearsAdornment}
            value={originalTerm}
            onChange={handleOriginalTermChange}
          />
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 8,
          }}
        >
          <Typography sx={{ mb: 4 }} gutterBottom variant="h6" component="div">
            Interest Rates
          </Typography>
          <TextField
            id="outlined-number"
            label="Coupon Rate"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={percentageAdornment}
            value={couponRate}
            onChange={handleCouponRateChange}
          />

          <FormControl sx={{ m: 1, width: "50ch" }}>
            <InputLabel id="coupon-rate-select-label">
              Coupon Rate Type
            </InputLabel>
            <Select
              labelId="coupon-rate-select-label"
              id="coupon-rate"
              value={couponRateType}
              label="Coupon Rate Type"
              onChange={handleCouponRateTypeChange}
              disabled
            >
              <MenuItem value={"fixed"}>Fixed</MenuItem>
              {/* <MenuItem value={"variable"}>Variable</MenuItem> */}
            </Select>
          </FormControl>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showAdvanced}
                  onChange={handleShowAdvanced}
                />
              }
              label="Show Advanced"
            />
          </FormGroup>
          {showAdvanced ? (
            <>
              <TextField
                id="outlined-number"
                label="Remaining Balance"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={dollarAdornment}
                value={remainingBalance}
                onChange={handleRemainingBalanceChange}
              />
              <TextField
                id="outlined-number"
                label="Remaining Term"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={yearsAdornment}
                value={remainingTerm}
                onChange={handleRemainingTermChange}
              />
              <TextField
                id="outlined-number"
                label="Prepaid Principal"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                value={prepaidPrincipal}
                InputProps={dollarAdornment}
                onChange={handlePrepaidPrincipalChange}
              />
              <TextField
                id="outlined-number"
                label="Appraisal Amount"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={dollarAdornment}
                value={appraisalAmount}
                onChange={handleAppraisalAmountChange}
              />
            </>
          ) : null}
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 16,
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            Results
          </Typography>
          <TextField
            id="outlined-read-only-input"
            label="Monthly Payment"
            value={monthlyPayment}
            InputProps={{
              readOnly: true,
              ...dollarAdornment,
            }}
          />
          {showAdvanced ? (
            <>
              <TextField
                id="outlined-read-only-input"
                label="Equity"
                value={equity}
                InputProps={{
                  readOnly: true,
                  ...dollarAdornment,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Loan To Value Ratio"
                value={loanToValueRatio}
                InputProps={{
                  readOnly: true,
                  ...percentageAdornment,
                }}
              />
            </>
          ) : null}
          <TextField
            id="outlined-read-only-input"
            label="Total Repayment"
            value={totalRepayment}
            InputProps={{
              readOnly: true,
              ...dollarAdornment,
            }}
          />
          <TextField
            id="outlined-read-only-input"
            label="Total Interest Paid"
            value={interestPaid}
            InputProps={{
              readOnly: true,
              ...dollarAdornment,
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
