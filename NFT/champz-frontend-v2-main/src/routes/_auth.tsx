import { Header } from "@/features/header/components/Header";
import { SocketClient } from "@/socketClient";
import { Container, Grid } from "@mui/material";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { AxiosInstance } from "axios";
import pvp from "assets/wallpaper/PvP.jpg";
import construction from "assets/wallpaper/construction.png";
import guilds from "assets/wallpaper/guilds.png";
import marketplace from "assets/wallpaper/marketplace.jpg";
import lss from "assets/wallpaper/lss.png";
import { UrlWithRequestId } from "@/types/urlWithRequestId";
import { PreloadAssets } from "@/components/PreloadAssets";
import { useLoadProgress } from "@/hooks/useLoadProgress";
import { fonts } from "@/fonts/fonts";
import { AuthContextProvider } from "@/features/auth/contexts/authContextProvider";
import { defaultGridSpacing } from "@/consts/spacings";

export type WalletDialogSearch = {
  wdopen?: boolean;
  wdtab?: "spores" | "truffles" | "earnings";
  tabAcc?: number;
};

export const Route = createFileRoute("/_auth")({
  validateSearch: (search: Record<string, unknown>): WalletDialogSearch => {
    return {
      wdopen: search.wdopen as boolean,
      wdtab: search.wdtab as "spores" | "truffles" | "earnings",
      tabAcc: search.tabAcc as number,
    };
  },
  component: AuthComponent,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.token) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    } else {
      // if token is available, these are not null
      return {
        api: context.api as AxiosInstance,
        socketClient: context.socketClient as SocketClient,
      };
    }
  },
});

const imageUrlsWithRequestId: UrlWithRequestId[] = [
  pvp,
  construction,
  guilds,
  marketplace,
  lss,
].map((url) => ({
  url,
  requestId: encodeURIComponent(url),
}));

const requestIds = [...imageUrlsWithRequestId].map(
  (imageUrlWithRequestId) => imageUrlWithRequestId.requestId,
);

function AuthComponent() {
  const context = Route.useRouteContext();
  const { aggregatedProgressPercent, ready, setReady } = useLoadProgress({
    requestIds,
  });

  if (!ready) {
    return (
      <PreloadAssets
        imageUrlsWithRequestId={imageUrlsWithRequestId}
        fonts={fonts}
        progressPercent={aggregatedProgressPercent}
        onReady={() => setReady(true)}
      />
    );
  }

  return (
    <Container maxWidth="xl">
      <AuthContextProvider api={context.api}>
        <Grid container columnSpacing={defaultGridSpacing}>
          <Grid item xs={12}>
            <Header onLogoutClicked={() => context.auth.logout()} />
          </Grid>
          <Grid item xs={12}>
            <Outlet />
          </Grid>
        </Grid>
      </AuthContextProvider>
    </Container>
  );
}
