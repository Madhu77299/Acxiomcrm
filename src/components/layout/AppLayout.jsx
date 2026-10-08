import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";

// Global Form Modals
import AddEditCustomerModal from "../modals/AddEditCustomerModal";
import AddEditLeadModal from "../modals/AddEditLeadModal";
import AddEditOpportunityModal from "../modals/AddEditOpportunityModal";
import ScheduleFollowUpModal from "../modals/ScheduleFollowUpModal";
import LogActivityModal from "../modals/LogActivityModal";

const AppLayout = () => {
  const [activeModal, setActiveModal] = useState(null); // 'add-customer', 'add-lead', 'add-opp', 'schedule-flw', 'log-activity'

  const handleOpenGlobalModal = (modalType) => {
    setActiveModal(modalType);
  };

  const handleCloseGlobalModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="crm-wrapper">
      <Sidebar />

      <div className="crm-main-content">
        <Header onOpenGlobalModal={handleOpenGlobalModal} />

        <main className="crm-body">
          <Outlet context={{ onOpenGlobalModal: handleOpenGlobalModal }} />
        </main>
      </div>

      {/* Global Action Modals */}
      {activeModal === "add-customer" && (
        <AddEditCustomerModal isOpen={true} onClose={handleCloseGlobalModal} />
      )}
      {activeModal === "add-lead" && (
        <AddEditLeadModal isOpen={true} onClose={handleCloseGlobalModal} />
      )}
      {activeModal === "add-opp" && (
        <AddEditOpportunityModal isOpen={true} onClose={handleCloseGlobalModal} />
      )}
      {activeModal === "schedule-flw" && (
        <ScheduleFollowUpModal isOpen={true} onClose={handleCloseGlobalModal} />
      )}
      {activeModal === "log-activity" && (
        <LogActivityModal isOpen={true} onClose={handleCloseGlobalModal} />
      )}
    </div>
  );
};

export default AppLayout;
