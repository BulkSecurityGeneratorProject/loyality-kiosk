(function() {
    'use strict';

    angular
        .module('kioskApp')
        .controller('CampaignDialogController', CampaignDialogController);

    CampaignDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Campaign', 'User', 'Promotion'];

    function CampaignDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Campaign, User, Promotion) {
        var vm = this;
        vm.campaign = entity;
        vm.users = User.query();
        vm.promotions = Promotion.query();
        vm.isValid = isFormValid;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('kioskApp:campaignUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.campaign.id !== null) {
                Campaign.update(vm.campaign, onSaveSuccess, onSaveError);
            } else {
                Campaign.save(vm.campaign, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.date = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };


        function isFormValid() {
            if (vm.campaign.type == 'PROMOTION'){
                return vm.campaign.date != null && vm.campaign.promotion !=null;
            }
            if (vm.campaign.type == 'CUSTOM'){
                return vm.campaign.date != null && vm.campaign.cardType !=null && vm.campaign.customText != null;
            }
        }
    }
})();