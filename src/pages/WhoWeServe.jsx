import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Marquee from '../components/Marquee';

export default function WhoWeServe() {
  return (
    <div style={{ paddingTop: '8rem' }}>
      <section className="page-section" style={{ background: '#000', padding: '4rem 2rem 0' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="section-label">Who We Serve</div>
            <h1 className="section-title" style={{ maxWidth: '600px' }}>Trusted by Utilities<br/>Across the Region</h1>
            <p className="page-body" style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(240,240,250,0.6)', maxWidth: '600px' }}>
              SolPowerlines prioritizes customer relationships and is proud to provide services to electrical utility companies like Electric Cooperatives, Municipal Owned Utilities, and Investor Owned Utilities.
            </p>
          </motion.div>
        </div>
      </section>

      <Marquee />

      <section className="section page-section" style={{ background: '#000' }}>
        <div className="container">
          <div className="page-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1px', background: 'rgba(240,240,250,0.06)' }}>
            {[
              {
                title: 'Electric Cooperatives',
                desc: 'Electric cooperatives are private, independent electric utilities, owned by the members they serve. Democratically governed businesses, electric cooperatives are organized under Cooperative Principles, anchoring them firmly in the communities they serve and ensuring that they are closely regulated by their consumers.',
                stat: 'Member-Owned'
              },
              {
                title: 'Municipal Owned Utilities',
                desc: 'A municipal utility is owned and operated by a city. In most cases, municipal utility rates are set at the city level, either by the municipal administration or by a local utility board or commission. We partner with municipalities to deliver reliable power infrastructure at the local level.',
                stat: 'City-Operated'
              },
              {
                title: 'Investor Owned Utilities',
                desc: 'An investor-owned utility provides a product or service regarded as a public utility, managed as a private enterprise rather than a function of government or a utility cooperative. We support IOUs with scalable construction and maintenance solutions.',
                stat: 'Private Enterprise'
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="page-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ background: '#000', padding: '3rem 2.5rem' }}
              >
                <div className="page-accent-title" style={{ fontFamily: 'Barlow Condensed', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.5rem' }}>{item.stat}</div>
                <h3 className="card-title" style={{ fontFamily: 'Inter', fontSize: '1.3rem', color: '#f0f0fa', fontWeight: 600, marginBottom: '1.25rem' }}>{item.title}</h3>
                <p className="card-body" style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(240,240,250,0.6)', marginBottom: '2rem' }}>{item.desc}</p>
                <Link to="/contact" className="card-link" style={{ fontFamily: 'Barlow Condensed', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--amber)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  Partner With Us <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginTop: '5rem', textAlign: 'center', maxWidth: '600px', margin: '5rem auto 0' }}>
            <p className="page-body" style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(240,240,250,0.5)', marginBottom: '2rem' }}>
              Sol Powerlines can serve your needs regardless of the scale or extent of your project requirements. We partner with our customers to facilitate T&D needs.
            </p>
            <Link to="/contact" className="btn btn-blue">
              Start a Conversation <ArrowRight size={14} style={{ marginLeft: '8px' }} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
