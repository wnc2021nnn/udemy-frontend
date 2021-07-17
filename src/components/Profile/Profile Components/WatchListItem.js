import { Grid, Box, Button, Card } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { StarV1 } from "../../UI/StarV1";

export function WatchListItem(props) {
  return (
    <Card
      style={{ padding: "16px", marginTop: "8px", marginBottom: "8px" }}
      onClick={props.onClick}
    >
      <Grid container>
        <Grid item xs={2}>
          <Box height="60px" width="80px">
            <img
              alt=""
              height="60px"
              width="80px"
              hidden=""
              style={{ borderRadius: "6px" }}
              src="https://img-c.udemycdn.com/course/240x135/1765246_4242_2.jpg?Expires=1621907051&Signature=lY4fIx3D4UkAE0qJ8EloMP1e~u7PArMOeKgnXXckgr8GUAX5LD7ZNde3WXcQ7loqhX4j-3iVEUJ9Ld4qihHNs8qiL6g1a-3GYqVJUbe--ySfjXftlvG~C6wo-qfHJZgtDg1bsof~Ar2D1VOt5rRaH1jShT2UNmOw0r0V8YYlm6RpGjxqNKW6YRXB90Cec04JMmaMN5dGCVx5ME3Thy9Ptlxxfdu7alAFHdaW1dwrDF4Ngm22Opw~v5F7Pmz7uDjAeoUgwVF1ho28BoRSgVsWe5o7UdsA-oRESEg~1w2PxwqmavwY52ZDZuNS~T4xMtD8gXqbRINepsGn282S85KFNg__&Key-Pair-Id=APKAITJV77WS5ZT7262A%201x,%20https://img-c.udemycdn.com/course/480x270/1765246_4242_2.jpg?Expires=1621907051&Signature=RqLSQpIXzzX9itnce6yWj7olLOBrUZHAqOnvt69sEAz~N2bGzdzr5kK5G0l8eBF7Rkjvd6FaY43371YXRh1AnUNU3aL8r8cjf~CBaD0~~fcY3xOFXR8GcRiCIwbIl~2mKUxVB9J-8wiAmDUJxqp0Bv9NloU1hfKtXx37Ah4KUV5EeMjmrGTjKCo-x1KpnbQUE20tEFX5agGADP~KdE3IDjU-uRuIV2VuAIlvaiIkCQfYWu1Ytw2SblR-npPP0S6fZSw2CVEI3owH9JtqAJ1OKvTw9dUSr3axkcyC9Hq822e6QqIat0gJAVEAVq6firHvdIKHJkLMG6Arv~ngNWOcMQ__&Key-Pair-Id=APKAITJV77WS5ZT7262A%202x"
            />
          </Box>
        </Grid>
        <Grid item xs={8} justifyContent="flex-start">
          <Box justifyContent="flex-start" display="flex" my={1}>
            <text>The Complete Python Programming Bootcamp</text>
          </Box>
          <Box my={1}>
            <StarV1 />
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Button>
            <Delete style={{ color: "EB5757" }} />
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
