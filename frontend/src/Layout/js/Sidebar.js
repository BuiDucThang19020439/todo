import "../css/Sidebar.css";
import "../../css/icon.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function Sidebar() {
  // isSmall: khi width của trình duyệt <992px, sidebar luôn ở trạng thái thu nhỏ
  const isSmall = useMediaQuery({
    query: "(max-width: 992px)",
  });

  /**
   * isSidebarCollapsed dùng để đóng mở sidebar
   * câu điều kiện dùng để thay đổi --sidebar-width lấy từ https://youtu.be/OMzuo7MOS2I?si=DlPZoWNSse25pEi4
   */
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const toggleSibarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  const closeSidebar = () => {
    setIsSidebarCollapsed(true);
  };

  let sidebarWidth = document.querySelector(":root");
  useEffect(() => {
    if (isSmall) {
      sidebarWidth.style.setProperty("--sidebar-width", "68px");
      closeSidebar();
    }
  }, [isSmall]);

  /**
   * hàm setSidebarCollapsed set giá trị width của sidebar khi đóng mở
   */
  function setSidebarCollapsed() {
    toggleSibarCollapse();
    !isSidebarCollapsed
      ? sidebarWidth.style.setProperty(
          "--sidebar-width",
          "var(--sidebar-collapsed-width)"
        )
      : sidebarWidth.style.setProperty(
          "--sidebar-width",
          "var(--sidebar-expanded-width)"
        );
  }
  // let rootStyles = getComputedStyle(sidebarWidth);
  // console.log(rootStyles.getPropertyValue("--sidebar-width"));

  return (
    <div className="sidebar">
      {/* -----------------------------sidebar khi mở -----------------------------------------------*/}
      {!isSidebarCollapsed && (
        <div className="extend-sidebar">
          <div className="head-sidebar">
            <Link to="/">
              <Button className="button-icon button-icon-home-icon">
                <ion-icon name="home-sharp" size="large"></ion-icon>
              </Button>
            </Link>
          </div>
          <div className="sidebar-route">
            <Link to="/" className="sidebar-item">
              <Button className="button-nav-item">
                Trang chủ
                <ion-icon name="home-sharp"></ion-icon>
              </Button>
            </Link>
            <Link to="/TodoList" className="sidebar-item">
              <Button className="button-nav-item">
                TodoList
                <ion-icon name="list"></ion-icon>
              </Button>
            </Link>
            <Link to="/userInfo" className="sidebar-item">
              <Button className="button-nav-item">
                Thông tin
                <ion-icon name="information-circle-sharp"></ion-icon>
              </Button>
            </Link>
          </div>
          <div>
            <Button
              type="button"
              className="button-icon button-icon-sidebar-collapse"
              onClick={setSidebarCollapsed}
            >
              <ion-icon name="chevron-back" size="large"></ion-icon>
            </Button>
          </div>
        </div>
      )}
      {/* ------------------------------------sidebar khi đóng---------------------------------------- */}
      {isSidebarCollapsed && (
        <div className="collapsed-sidebar">
          <div className="head-sidebar">
            <Link to="/">
              <Button className="button-icon button-icon-home-icon">
                <ion-icon name="home-sharp" size="large"></ion-icon>
              </Button>
            </Link>
          </div>

          <div className="sidebar-route">
            <Link to="/" className="sidebar-item">
              <Button className="button-nav-item">
                <ion-icon name="home-sharp"></ion-icon>
              </Button>
            </Link>
            <Link to="/TodoList" className="sidebar-item">
              <Button className="button-nav-item">
                <ion-icon name="list" size=""></ion-icon>
              </Button>
            </Link>
            <Link to="/userInfo" className="sidebar-item">
              <Button className="button-nav-item">
                <ion-icon name="information-circle-sharp"></ion-icon>
              </Button>
            </Link>
          </div>
          {!isSmall && (
            <div>
              <Button
                type="button"
                className="button-icon button-icon-sidebar-expand"
                onClick={setSidebarCollapsed}
              >
                <ion-icon name="chevron-forward" size="large"></ion-icon>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
