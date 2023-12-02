import SideNavbar from "./SideNavbar";
import Content from "./Content";
function Template() {
  return (
    <>
      <div style={{ height: "100px", backgroundColor: "#186F65" }}></div>
      <div
        style={{ height: "calc(100vh - 100px)", backgroundColor: "#FCE09B" }}
      ></div>
      <div
        style={{
          height: "calc(100vh - 40px)",
          width: "calc(100vw - 40px)",
          position: "absolute",
          backgroundColor: "white",
          top: "20px",
          left: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: "50px",
            width: "100%",
            backgroundColor: "#B5CB99",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontSize: "19px",
              lineHeight: "50px",
              margin: "0 0 0 20px",
              padding: "0",
              fontWeight: "bold",
            }}
          >
            Crunch
          </p>
          <button
            style={{ border: "none", background: "none", margin: "0 20px 0 0" }}
          >
            Logout
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: ".5fr 11.5fr" }}>
          <SideNavbar />
          <Content />
        </div>
      </div>
    </>
  );
}

export default Template;
