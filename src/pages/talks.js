// @jsx jsx
import React from "react";
import Layout from "../templates/layout";
import { jsx, css } from "@emotion/core";

import Helmet from "react-helmet";
import { ContactForm } from "../components";
import { getBreakpoints } from "../helpers/utils";

const mq = getBreakpoints();

export default () => (
  <Layout>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Nathan Simpson - Designer + Frontend Developer</title>
      <meta
        name="description"
        content="I am a UX Designer, Frontend Developer, and aspiring entrepreneur, passionate about building ideas from concept to prototype."
      />
    </Helmet>
    <main>
      <h1>Talks</h1>
      {[
        {
          id: "8D_bwTpDTTs",
          name: "How I prototyped a social network with KeystoneJS 5",
          desc:
            "At the May SydJS meetup, Thinkmill unveiled Keystone 5 with a line-up of talks. In this talk, I show off how I am building The Garage, a social network for car lovers, using Keystone 5 and React Native."
        }
      ].map(talk => (
        <Video talk={talk} />
      ))}
    </main>
  </Layout>
);

const Video = ({ talk }) => (
  <div
    css={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      margin: "70px 0"
    }}
  >
    <iframe
      width="100%"
      height="450"
      css={{
        boxSizing: "border-box",
        paddingRight: 16,
        width: "100%",
        [mq[1]]: {
          width: "50%"
        },
        [mq[2]]: {
          width: "60%"
        }
      }}
      src={`https://www.youtube.com/embed/${talk.id}`}
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />

    <div
      css={{
        width: "100%",
        [mq[1]]: {
          width: "50%"
        },
        [mq[2]]: {
          width: "40%"
        }
      }}
    >
      <h2>{talk.name}</h2>
      <p>{talk.desc}</p>
    </div>
  </div>
);
