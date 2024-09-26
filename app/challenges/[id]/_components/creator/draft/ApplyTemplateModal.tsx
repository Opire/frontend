import { Button, Modal, Select, Space, Alert } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { CreateChallengeTemplate, useGetCreateChallengeTemplates } from "../../../../../../hooks/useGetCreateChallengeTemplates";

export function ApplyTemplateModal({ applyTemplate }: { applyTemplate: (template: CreateChallengeTemplate) => void }): React.ReactElement {
    const { templates, isLoadingTemplates } = useGetCreateChallengeTemplates();
    const [
        isModalToSelectTemplateOpen,
        { close: closeModalToSelectTemplate, open: openModalToSelectTemplate },
    ] = useDisclosure();

    const [selectedTemplate, setSelectedTemplate] =
        useState<CreateChallengeTemplate | null>(null);

    function onChangeTemplate(value: string | null) {
        const template = templates.find((template) => template.label === value);

        setSelectedTemplate(template ?? null);
    }

    function onApplyTemplate() {
        if (selectedTemplate) {
            applyTemplate(selectedTemplate);
        }

        closeModalToSelectTemplate();
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "end" }}>
                <Button
                    onClick={openModalToSelectTemplate}
                    loading={isLoadingTemplates}
                    disabled={isLoadingTemplates}
                    color="indigo"
                    variant="outline"
                >
                    Use template
                </Button>
            </div>

            <Modal
                opened={isModalToSelectTemplateOpen}
                onClose={closeModalToSelectTemplate}
                title="Choose a template to apply to your challenge"
                centered
            >

                <Select
                    label="Available templates"
                    placeholder="Select a template"
                    data={templates.map((template) => ({
                        label: template.label,
                        value: template.label,
                    }))}
                    value={selectedTemplate?.label}
                    onChange={onChangeTemplate} />

                <Space h={"2rem"} />

                <Alert
                    variant="light"
                    color="yellow"
                    title="Be careful!"
                    icon={<IconInfoCircle />}
                >
                    This will override the current configuration of your challenge
                </Alert>

                <Space h={"1rem"} />

                <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                        onClick={onApplyTemplate}
                        color="indigo"
                        variant="filled"
                    >
                        Apply selected template
                    </Button>
                </div>
            </Modal>
        </>
    );
}