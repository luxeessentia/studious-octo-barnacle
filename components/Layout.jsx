export default function Layout({ children }) {
  return (
    <>
      <PromoBar />
      <Header />
      <main className='container' style={{ paddingTop: 16, paddingBottom: 160 }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
