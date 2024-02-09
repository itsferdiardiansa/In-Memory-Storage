function createIdMessages(map) {
  const messages = []

  for (let id in map) {
    if (map[id].size > 1) {
      messages.push(`${Array.from(map[id]).join(', ')} have the same id \`${id}\`.`)
    }
  }

  return messages
}

function createManagerMessages(managers, employees) {
  const messages = []

  for (let id in employees) {
    if (managers[id].size > 1) {
      const currentManagers = managers[id]

      for (let employee of employees[id]) {
        messages.push(
          `${employee} has multiple managers: ${Array.from(currentManagers).join(', ')}.`
        )
      }
    }
  }

  return messages
}

function getReasons(employees) {
  const hierarchyMessages = []
  const managers = {}
  const mapEmployees = {}

  for (const employee of employees) {
    if (!managers[employee.id]?.size) managers[employee.id] = new Set()

    for (const manager of employee.managers) {
      managers[employee.id].add(manager.name)
    }

    if (!mapEmployees[employee.id]) mapEmployees[employee.id] = new Set()
    mapEmployees[employee.id].add(employee.name)

    if (!Boolean(employee.directReport) && !Boolean(employee.indirectReports)) {
      hierarchyMessages.push(`${employee.name} not having hierarchy.`)
    }
  }

  const idMassages = createIdMessages(mapEmployees)
  const managerMessages = createManagerMessages(managers, mapEmployees)

  return [...idMassages, ...managerMessages, ...hierarchyMessages]
}

/**
 * A validation of employee hierarchy
 *
 * @param data
 * @returns
 */
export function employeeHierarchyValidation(data) {
  const reasons = getReasons(data)
  const description = !Boolean(data.length)
    ? 'Not found'
    : !Boolean(reasons.length)
      ? 'Valid hierarchy'
      : 'Unable to process employeee hierarchy'

  return { description, reasons }
}
