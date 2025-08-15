import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import React from 'react'

const ModelComponent = ({ isOpen, onOpenChange, deleteFunction, isDeleting, title}) => {
return (
  <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
    <ModalContent className="bg-white dark:bg-gray-900">
      {(onClose) => (
        <>
          <ModalHeader className="text-red-600 dark:text-red-400 text-lg font-bold">
            Confirm Delete
          </ModalHeader>
          <ModalBody>
            <p className="text-gray-700 dark:text-gray-300">
              Are you sure you want to delete this{" "}
              <span className="font-semibold">{title}</span>? This action
              cannot be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              variant="light"
              onPress={onClose}
              className="dark:text-gray-200"
            >
              Cancel
            </Button>
            <Button
              color="danger"
              isLoading={isDeleting}
              onPress={() => deleteFunction(onClose)}
              className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600"
            >
              Delete
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
);

}

export default ModelComponent