import React from "react"
import { Link } from "gatsby"
import { Button } from "rsuite"
import "rsuite/src/styles/themes/default/index.less"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site with rsuite.</p>
    <p className="description">
      A suite of React components, intimate UI design, and a friendly
      development experience.
      <br />
      <br />
    </p>
    <Button appearance="primary">Getting started</Button>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <bt />
    <Button appearance="link" componentClass={Link} to="/page-2/">
      Go to page 2
    </Button>
  </Layout>
)

export default IndexPage
