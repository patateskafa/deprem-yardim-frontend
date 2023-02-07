import { useMapActions, usePopUpData } from "@/stores/mapStore";
import theme from "@/utils/theme";
import { Close } from "@mui/icons-material";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import formatcoords from "formatcoords";
import { CopyButton } from "../Button/CopyButton";
import { generateGoogleMapsUrl, googleMapsButtons } from "../Drawer/Drawer";
import { findTagByClusterCount } from "../Tag/Tag.types";
import styles from "./ClusterPopup.module.css";

export interface ClusterPopupProps {
  data?: any;
}

export function ClusterPopup() {
  const { setPopUpData } = useMapActions();
  const data = usePopUpData();
  const lat = data?.baseMarker.geometry.location.lat ?? 0;
  const lng = data?.baseMarker.geometry.location.lng ?? 0;
  const tag = findTagByClusterCount(data?.count ?? 0);

  if (!data) return null;

  return (
    <Card
      variant="outlined"
      className={styles.popupContainer}
      sx={{
        maxWidth: 400,
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Grid container gap={3} alignItems="center">
          <Grid item xs alignItems="center">
            <Typography variant="subtitle2" sx={{ py: 0 }}>
              {data?.count ?? 0} kişi enkaz altında
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <Chip
              label={tag.intensity}
              style={{ background: tag.color }}
              sx={{ fontSize: theme.typography.pxToRem(12) }}
              size="small"
            />
          </Grid>
          <Grid item xs="auto">
            <IconButton
              aria-label="close"
              onClick={() => setPopUpData(null)}
              size="small"
            >
              <Close fontSize="medium" />
            </IconButton>
          </Grid>
        </Grid>
        <Typography sx={{ pt: 1, pb: 1 }}>
          {data?.baseMarker?.formatted_address}
        </Typography>

        <Typography variant="subtitle2" sx={{ mb: 0 }}>
          {formatcoords([lat, lng]).format()}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row">
          <Stack rowGap="8px">
            {googleMapsButtons.map((button) => (
              <Button
                key={button.label}
                variant="outlined"
                color="primary"
                endIcon={<LaunchIcon fontSize="small" />}
                style={{ textTransform: "unset" }}
                sx={{
                  mr: 2,
                }}
                onClick={() => button.urlCallback(lat, lng)}
              >
                {button.label}
              </Button>
            ))}
          </Stack>
          <Stack justifyContent="center">
            <CopyButton
              color="primary"
              data={generateGoogleMapsUrl(lat, lng)}
            />
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
}
