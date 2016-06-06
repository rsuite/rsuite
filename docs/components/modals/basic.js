const ModalsBasic = React.createClass({
    getInitialState() {
        return {
            showModal: false,
            autoResizeHeight: false
        };
    },
    close() {
        this.setState({
            showModal: false
        });
    },
    open(event) {

        this.setState({
            showModal: true,
            autoResizeHeight: event.currentTarget.innerText === 'Auto Resize Height'
        });
    },
    render() {
        return (
            <div className="modal-container">
                <ButtonToolbar>
                      <Button shape="default" onClick={this.open}> Show Modal</Button>
                      <Button shape="default" onClick={this.open}> Auto Resize Height</Button>
                </ButtonToolbar>
                <Modal autoResizeHeight = {this.state.autoResizeHeight} show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        <Modal.Title>About Hypers</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>HYPERS 引领企业大数据营销</h4>
                        <p>我们致力于将数据资产化，驱动数据解决实际问题，把数据变得好用和有用，创造更为智能的互联世界。</p>
                        <p>聚集了来自Google，微软，惠普，埃森哲等众多精英，自主研发了世界一流的大规模实时数据服务平台和第一方全营销链DMP。</p>
                        <p>HyperS的数据业务日均服务几千万互联网用户，分析超过70亿PV，集成包括微博、微信、EDM、电商、移动APP、在线广告、网站、CRM等各种传播渠道，帮助我们的合作伙伴全方位的收集数据，处理数据，洞悉数据，并最终让数据为合作伙伴赢得客户，获得更大的收益。</p>
                        <p>HyperS的技术和服务已经帮助众多一流企业获得更好的用户体验及更好的投资回报。</p>

                        <h4>为什么选择我们</h4>
                        <p>宏路数据坚持自主创新，沉淀了丰富和坚实的企业级大数据技术和应用实践，软件著作、专利、技术创新过百项。目前宏路数据的业务已经拓展至金融、汽车、电信、政府、媒体、互联网等多个行业，使企业能够快速、低成本地使用成熟的大数据技术和应用服务，帮助企业在“互联网+”时代获得大数据能力并转化为生产力。</p>
                        <p>技术 - 实现海量多源异构数据整合、挖掘、系统化、智能化、可视化</p>
                        <p>数据 - 融合数据，推动数据流转</p>
                        <p>产品 - 全面覆盖大数据的各个层级，一站式完成大数据部署、管理及应用</p>

                        <h4>我们的文化</h4>
                        <p>创新 开放 激情 有趣 诚信</p>
                        <p>我们渴求意志坚定、睿智创新的人；我们看重能力胜于经历。</p>
                        <p>我们有着相同的目标与愿景，我们坚实的步伐成就了如今的Hypers，我们毕业于不同的学校，来自不同的城市，我们的客户服务不仅仅是国内市场，更在国际市场上打造别样天空。Hypers在大数据营销技术独占一角。</p>
                        <p>工作之余，Hypers员工们也有着各种兴趣与爱好，篮球、足球、羽毛球；</p>
                        <p>吃货群：火锅、烤肉、brunch、日料、减肥神马的抛脑后；</p>
                        <p>年年旅游、月月庆生，各种节日不定时登场。</p>
                        <p>我们力求保持创业公司的开放文化。扁平化管理的背景下，每个人都是亲自参与的贡献者，可以毫无顾忌地交流各自的想法和观点。我们的茶水间为Hypers员工进行组内交流和跨组交流提供了便利，大家在休闲娱乐的同时，还可进行工作方面的交谈。</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close} shape="primary">Confirm</Button>
                        <Button onClick={this.close} shape="default">Cancel</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
});


ReactDOM.render(<ModalsBasic />, mountNode);
