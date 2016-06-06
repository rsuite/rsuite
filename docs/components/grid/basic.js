const gridInstance = (
    <Grid>
        <Row className="show-grid">
            <Col xs={12} md={8}>xs={12} md={8}</Col>
            <Col xs={6} md={4}>xs={6} md={4}</Col>
        </Row>

        <Row className="show-grid">
            <Col xs={6} md={4}>xs={6} md={4}</Col>
            <Col xs={6} md={4}>xs={6} md={4}</Col>
            <Col xsHidden md={4}>xsHidden md={4}</Col>
        </Row>

        <Row className="show-grid">
            <Col xs={6} xsOffset={6}>xs={6} xsOffset={6}</Col>
        </Row>

        <Row className="show-grid">
            <Col md={6} mdPush={6}>md={6} mdPush={6}</Col>
            <Col md={6} mdPull={6}>md={6} mdPull={6}</Col>
        </Row>
    </Grid>
);
ReactDOM.render(gridInstance, mountNode);
