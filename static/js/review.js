$(document).ready(function () {
  // Handle Approve Button
  $(".approveButton").on("click", function() {
    var bonuskey = $(this).data("bonuskey");
    var updateMileageLog = {
      submissionID: bonuskey,
      iStatus: 1
    };

    $.ajax("/handle-submission", {
      type: "PUT",
      data: updateMileageLog
    }).then(
      function() {
        console.log("Entry approved");
        location.reload();
      }
    );
  });

  // Handle Reject Button
  $(".rejectButton").on("click", function() {
    var bonuskey = $(this).data("bonuskey");
    var updateMileageLog = {
      submissionID: bonuskey,
      iStatus: 2
    };

    $.ajax("/handle-submission", {
      type: "PUT",
      data: updateMileageLog
    }).then(
      function() {
        console.log("Entry denied");
        location.reload();
      }
    );
  });
})