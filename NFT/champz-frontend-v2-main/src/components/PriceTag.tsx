import { Currencies } from "@/consts/currencies";
import { Box, styled } from "@mui/material";
import truffelsImg from "@/assets/icons/economy/truffles.svg";
import sporesImg from "@/assets/icons/economy/spores.svg";
import { aladin } from "@/fonts/aladin";
import { FontSize } from "@/consts/fontSize";
import { FontWeight } from "@/consts/fontWeight";
import { TextColor } from "@/consts/textColor";
import { ChampzOutputFormatNumber } from "./ChampzFormatting/ChampzOutputFormatNumber";

export function PriceTag(props: PriceTagProps) {
  const { type, value, ...other } = props;

  const PriceTag = styled(Box)(() => ({
    height: "3em",
    maxHeight: "100%",
    maxWidth: "3em",
    position: "relative",
    "& img": {
      maxHeight: "100%",
      Selection: "none",
    },
  }));

  const PriceTagValue = styled(Box)(() => ({
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    fontFamily: aladin.fontFamily,
    fontSize: FontSize.XS,
    fontWeight: FontWeight.M,
    WebkitTextFillColor: TextColor.light,
    WebkitTextStroke: `4px ${TextColor.dark}`,
    paintOrder: `stroke fill`,
  }));

  const getCurrencyImage = (currency: Currencies) => {
    switch (currency) {
      case Currencies.SPORES:
        return sporesImg;
      case Currencies.TRUFFLES:
        return truffelsImg;
      default:
        return undefined;
    }
  };
  return (
    <PriceTag {...other}>
      <img src={getCurrencyImage(type)} />
      <PriceTagValue>
        <ChampzOutputFormatNumber value={value} showBackground={false} />
      </PriceTagValue>
    </PriceTag>
  );
}

interface PriceTagProps {
  type: Currencies;
  value: number;
}
