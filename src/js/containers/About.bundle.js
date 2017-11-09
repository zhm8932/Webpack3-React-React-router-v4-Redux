/**
 * Created by haiming.zeng on 2017/10/27.
 */
import '../../sass/abouts.scss'
const About = ()=>(
	<div>
		<div className="ads">
			<img src={require("../../images/b-about.png")}/>
		</div>
		<section className="tit">
			<div className="wrapper"><span data-type="1" className="on"><i className="iconfont icon-shangjiantou"></i>公司简介</span><span data-type="2"><i className="iconfont icon-shangjiantou"></i>明日科技大事记</span><span data-type="3"><i className="iconfont icon-shangjiantou"></i>业务覆盖</span><span data-type="4"><i className="iconfont icon-shangjiantou"></i>产品介绍</span></div>
		</section>
		<section className="wrapper about about-first">
			<header id="1">
				<h2>公司简介</h2>
			</header>
			<div className="brief clearfix">
				<figure><img src={require("../../images/about01.png")} alt="公司简介"/>
					<figcaption>
						<p>深圳市明日科技咨询有限责任公司（以下简称“明日”）是一家注册在深圳市前海自贸区的金融科技公司，本着为消费者、商户及金融机构服务的宗旨，明日将依托自身在消费金融行业丰富的经验、全国广泛的销售网络以及全行业品类的全金融产品，致力于成为最具价值的金融服务提供商。</p>
						<p>我们是银监会批准的持牌消费金融机构战略合作伙伴</p>
						<p>我们是一家业务覆盖全国范围的消费金融信息服务提供商</p>
						<p>我们是一家具有丰富消费金融行业经验的金融服务提供商</p>
						<p>我们是一家拥有庞大密集销售网络及商户资源的金融服务提供商</p>
					</figcaption>
				</figure>
			</div>
		</section>
		<section className="wrapper about">
			<header id="2">
				<h2>明日科技大事记</h2>
			</header><img data-original="/images/about02.png" alt="明日科技大事记"/>
		</section>
		<section className="wrapper about">
			<header id="3">
				<h2>业务覆盖</h2>
			</header><img data-original="/images/about03.png" alt="业务覆盖"/>
		</section>
		<section className="wrapper about">
			<header id="4">
				<h2>产品介绍</h2>
			</header>
			<div className="introduce">
				<div className="hd"><span className="on">商品贷<i className="iconfont icon-arrow-top"></i></span><span>其他产品<i className="iconfont icon-arrow-top"></i></span></div>
				<div className="bd clearfix">
					<aside>
						<dl className="introduce-left clearfix">
							<dt>
								<h3>商品贷</h3>
								<h4>多场景灵活分期</h4>
								<p>品质生活更轻松</p>
							</dt>
							<dd>
								<figure><img data-original="/images/about-s01.png"/>
									<figcaption>
										<h5>极简流畅</h5>
										<p>0担保，0抵押</p>
										<p>轻松四步，申请轻松</p>
									</figcaption>
								</figure>
								<figure><img data-original="/images/about-s02.png"/>
									<figcaption>
										<h5>快速高额</h5>
										<p>最快两分钟完成审批</p>
										<p>最高20万信用贷款</p>
									</figcaption>
								</figure>
								<figure><img data-original="/images/about-s03.png"/>
									<figcaption>
										<h5>尊享服务</h5>
										<p>1对1专属VIP服务</p>
										<p>轻松分期</p>
									</figcaption>
								</figure>
								<figure><img data-original="/images/about-s04.png"/>
									<figcaption>
										<h5>O2O商城</h5>
										<p>网上预约、到店提货</p>
										<p>正品行货、品质无忧</p>
									</figcaption>
								</figure>
							</dd>
						</dl>
						<div className="introduce-right"><img data-original="/images/about-phone.png"/></div>
					</aside>
					<aside className="other"><img src="/images/other.jpg"/></aside>
				</div>
			</div>
		</section>
	</div>
);

export default About